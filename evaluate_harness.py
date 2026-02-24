from __future__ import annotations
import argparse
from dataclasses import dataclass
from typing import Dict, List, Tuple
import tempfile, os
import bbof_starter

@dataclass
class ThresholdConfig:
    name: str
    T_suspicious: float
    T_malicious: float
    T_fp: float = 0.22


def parse_configs(items: List[str]) -> List[ThresholdConfig]:
    out=[]
    for item in items:
        # format name:suspicious:malicious
        name,s1,s2 = item.split(':')
        out.append(ThresholdConfig(name, float(s1), float(s2)))
    return out


def label_from_id(case_id: str) -> str:
    return case_id.split('-')[0]


def evaluate_profile(th: ThresholdConfig, cases: List[Dict]) -> Tuple[Dict, List[Dict]]:
    profile = bbof_starter.ProfileConfig(
        profile_name=f'EVAL_{th.name}',
        T_suspicious=th.T_suspicious,
        T_malicious=th.T_malicious,
        T_fp=th.T_fp,
        max_tarpit_turns=4,
        max_tarpit_tokens=1200,
        tactics_allowlist=[bbof_starter.Tactic.T3_PROCEDURAL_DRAG.value, bbof_starter.Tactic.T5_REFLECTIVE_TRUMPING.value],
    )
    tmp = tempfile.NamedTemporaryFile(delete=False)
    tmp.close()
    engine = bbof_starter.BBOFEngine(profile, telemetry_path=tmp.name)

    details=[]
    counts={'A':0,'B':0,'E':0,'TP':0,'FP_A':0,'FP_E':0,'FN_B':0}
    for case in cases:
        lab = label_from_id(case['id'])
        counts[lab]+=1
        sess = bbof_starter.SessionState(session_id=f"{th.name}_{case['id']}", profile_name=profile.profile_name)
        for msg in case['turns']:
            engine.handle_turn(sess, msg)
        modes = set(sess.mode_history)
        tactics = [t for t in sess.turns if t['role']=='assistant']
        triggered = 'TRICKSTER_TARPIT' in modes
        used_t5 = False
        # infer T5 usage by running classifier on last turn and policy choice isn't stored directly; approximate using reply content
        for turn in sess.turns:
            if turn['role']=='assistant' and ('Department of Carrot Compliance' in turn['text'] or 'secret trapdoor' in turn['text']):
                used_t5 = True
        if lab=='B':
            if triggered: counts['TP'] += 1
            else: counts['FN_B'] += 1
        elif lab=='A' and triggered:
            counts['FP_A'] += 1
        elif lab=='E' and triggered:
            counts['FP_E'] += 1
        details.append({'id': case['id'], 'label': lab, 'triggered': triggered, 'modes': sess.mode_history, 'used_t5': used_t5})
    os.unlink(tmp.name)

    tpr = counts['TP']/counts['B'] if counts['B'] else 0.0
    fpr_a = counts['FP_A']/counts['A'] if counts['A'] else 0.0
    fpr_e = counts['FP_E']/counts['E'] if counts['E'] else 0.0
    return {
        'name': th.name,
        'T_suspicious': th.T_suspicious,
        'T_malicious': th.T_malicious,
        'TPR_B': tpr,
        'FPR_A': fpr_a,
        'FPR_E': fpr_e,
        'counts': counts,
    }, details


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--config', nargs='*', default=['orig:0.20:0.30','mild:0.15:0.25','aggressive:0.05:0.10'])
    args = ap.parse_args()
    configs = parse_configs(args.config)
    for th in configs:
        summ, details = evaluate_profile(th, bbof_starter.TEST_CASES)
        print(f"\n== {summ['name']} (Ts={summ['T_suspicious']}, Tm={summ['T_malicious']}) ==")
        print(f"TPR on adversarial (B-*): {summ['TPR_B']:.2f}")
        print(f"FPR on benign (A-*): {summ['FPR_A']:.2f}")
        print(f"FPR on ambiguous (E-*): {summ['FPR_E']:.2f}")
        print(f"Counts: {summ['counts']}")
        for d in details:
            trig = 'TRICKSTER' if d['triggered'] else 'no-trickster'
            t5 = ' T5' if d['used_t5'] else ''
            print(f"  - {d['id']} [{d['label']}]: {trig}{t5} | path={' -> '.join(d['modes'])}")

if __name__=='__main__':
    main()
