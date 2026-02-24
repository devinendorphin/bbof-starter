from __future__ import annotations
import json, sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

@dataclass
class TurnSummary:
    turn_id: str
    mode: Optional[str]=None
    malicious_confidence: Optional[float]=None
    benign_creative_confidence: Optional[float]=None
    false_positive_risk: Optional[float]=None
    top_positive_features: List[str]=field(default_factory=list)
    top_negative_features: List[str]=field(default_factory=list)
    policy_blocked: bool=False
    policy_block_reasons: List[str]=field(default_factory=list)
    tactic: Optional[str]=None
    outcome: Optional[str]=None

@dataclass
class SessionSummary:
    session_id: str
    profile_name: Optional[str]=None
    turns: Dict[str, TurnSummary]=field(default_factory=dict)
    def get_or_create_turn(self, turn_id: str) -> TurnSummary:
        self.turns.setdefault(turn_id, TurnSummary(turn_id))
        return self.turns[turn_id]

def load_events(path: str):
    out=[]
    with open(path,'r',encoding='utf-8') as f:
        for line in f:
            line=line.strip()
            if line:
                out.append(json.loads(line))
    return out

def build_sessions(events):
    sessions={}
    for ev in events:
        sid=ev.get('session_id','unknown'); tid=ev.get('turn_id','unknown'); et=ev.get('event_type'); p=ev.get('payload',{})
        sess=sessions.setdefault(sid, SessionSummary(sid, ev.get('profile_name')))
        t=sess.get_or_create_turn(tid)
        if et=='classifier_decision':
            t.malicious_confidence=p.get('malicious_confidence'); t.benign_creative_confidence=p.get('benign_creative_confidence'); t.false_positive_risk=p.get('false_positive_risk')
            t.top_positive_features=p.get('top_positive_features') or []; t.top_negative_features=p.get('top_negative_features') or []
        elif et=='mode_transition': t.mode=p.get('new_mode')
        elif et=='policy_block': t.policy_blocked=True; t.policy_block_reasons=p.get('reason_codes') or []
        elif et=='tarpit_strategy_applied': t.tactic=p.get('tactic')
        elif et=='session_outcome': t.outcome=p.get('outcome')
    return sessions

def compute_metrics(sessions):
    mode_counts=Counter(); tactic_counts=Counter(); outcome_counts=Counter(); block_reasons=Counter(); pos_feats=Counter()
    total=0; trickster=0; trickster_blocked=0; mal=[]; fp=[]; paths={}
    for sid,s in sessions.items():
        seq=[]
        for t in s.turns.values():
            total += 1
            if t.mode: mode_counts[t.mode]+=1; seq.append(t.mode)
            if t.tactic: tactic_counts[t.tactic]+=1
            if t.outcome: outcome_counts[t.outcome]+=1
            if t.policy_blocked:
                for r in t.policy_block_reasons or ['UNKNOWN']: block_reasons[r]+=1
                if t.mode=='TRICKSTER_TARPIT': trickster_blocked += 1
            if t.mode=='TRICKSTER_TARPIT': trickster += 1
            if t.malicious_confidence is not None: mal.append(t.malicious_confidence)
            if t.false_positive_risk is not None: fp.append(t.false_positive_risk)
            for f in t.top_positive_features: pos_feats[f]+=1
        c=[]
        for m in seq:
            if not c or c[-1]!=m: c.append(m)
        paths[sid]=c
    return {
        'counts': {'sessions': len(sessions), 'turns': total, 'trickster_turns': trickster, 'trickster_blocked_turns': trickster_blocked},
        'mode_counts': dict(mode_counts), 'tactic_counts': dict(tactic_counts), 'outcome_counts': dict(outcome_counts),
        'policy_block_reason_counts': dict(block_reasons), 'top_positive_feature_counts': dict(pos_feats),
        'score_stats': {
            'malicious_confidence_avg': (sum(mal)/len(mal) if mal else None), 'malicious_confidence_max': (max(mal) if mal else None),
            'false_positive_risk_avg': (sum(fp)/len(fp) if fp else None), 'false_positive_risk_max': (max(fp) if fp else None),
        },
        'session_mode_paths': paths,
    }

def print_report(m):
    print('=== BBOF Telemetry Metrics Report ===')
    for k,v in m['counts'].items(): print(f'- {k}: {v}')
    print('\nMode counts:'); [print(f'  {k}: {v}') for k,v in sorted(m['mode_counts'].items())]
    print('Tactic counts:'); [print(f'  {k}: {v}') for k,v in sorted(m['tactic_counts'].items())]
    print('Outcome counts:'); [print(f'  {k}: {v}') for k,v in sorted(m['outcome_counts'].items())]
    print('Top positive features:'); [print(f'  {k}: {v}') for k,v in sorted(m['top_positive_feature_counts'].items(), key=lambda kv: kv[1], reverse=True)]
    print('Score stats:'); [print(f'  {k}: {v:.3f}' if isinstance(v,float) else f'  {k}: {v}') for k,v in m['score_stats'].items()]
    print('Session paths:'); [print(f'  {k}: {" -> ".join(v)}') for k,v in sorted(m['session_mode_paths'].items())]

if __name__=='__main__':
    path=sys.argv[1] if len(sys.argv)>1 else 'bbof_telemetry.jsonl'
    print_report(compute_metrics(build_sessions(load_events(path))))
