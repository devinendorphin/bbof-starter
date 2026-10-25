# Permission resolution 0.1

25 October 2026 · Local synthetic study · New spending: $0

This study adds a trusted-authority state model and neutral permission resolution while leaving defender v0.2 and observer 0.3 unchanged. It tests legitimate task completion and authorization transitions, not an improvisational entity or real identity verification.

## Protocol

Five policies share the same available verification API and synthetic record world:

1. **Blocking:** denies an unverified private read without a next-step hint.
2. **Helpful blocking:** denies access and offers the shared verification path.
3. **Static decoy:** returns a shadow record for an unverified private read.
4. **Clarify then decoy:** asks for scope confirmation, then returns a shadow record if the actor continues.
5. **Neutral resolution:** explains verified/pending/denied/unavailable/expired/revoked state and offers verification when that can progress.

The static policy is the relevant historical comparator for the record task: v0.2's adaptive review changes the setup workflow, not archive reads. This study does not retest every historical tactic under every resource type.

There are eight authority fixtures, two authored actor styles, and three seed variants: **240 main executions**. Fixtures include already verified, pending then approved, pending then denied, pending then unavailable, unavailable, denied, expired, and revoked. An eligible case is one in which the fixture authority can issue a current grant. Other cases must remain unresolved or denied; they are not authorized task-completion failures.

One actor follows visible next-step guidance and stops on a record-shaped reply or terminal response. The other requests authorization before attempting the private read. These are program rules, not observations of actual people or models. Entitlement is supplied only by the trusted authority fixture, never by an intent label or role claim in the actor request.

The model assumes that the trusted authority's decisions and subject/session binding are correct. It implements no real identity proof, enrollment, cryptographic trust service, or network. Synthetic receipts are checked against an issuer registry, scope, subject, session, grant generation, and current state. This is state-machine research, not a deployable access-control implementation.

## Main results

Each policy has 48 cases, including 12 eligible cases.

| Policy | Eligible tasks completed | Shadow/private-shaped replies across all cases | Unauthorized canonical disclosures | Total actor actions |
| --- | ---: | ---: | ---: | ---: |
| Blocking | 6/12 | 0 | 0 | 165 |
| Helpful blocking | 12/12 | 0 | 0 | 210 |
| Static decoy | 6/12 | 24 | 0 | 165 |
| Clarify then decoy | 6/12 | 24 | 0 | 189 |
| Neutral resolution | 12/12 | 0 | 0 | 198 |

Under authorization-first behavior, eligible tasks finish under every policy. Under guidance-following behavior, the unhelpful blocker stops too soon and decoys produce a record-shaped result before verification; those scripted actors stop without obtaining the canonical record. Helpful blocking and neutral resolution offer a path that the selected actor follows. That interaction explains the completion difference. It is not a generalized estimate of user behavior or deception quality.

Helpful blocking is deliberately a strong baseline. It reaches the same eligible task completion as neutral resolution. Thus, the practical completion improvement does not require a special trickster mechanism. Neutral resolution uses 198 rather than 210 total actions and 17,951 rather than 18,434 reply bytes because it can stop promptly when authority context already says denied, expired, revoked, or unavailable. These are state-aware differences in the chosen fixtures, not evidence of measured financial savings, actual CPU cost, or broad superiority.

## Receipt and permission controls

**90 invalid-receipt executions** cover forged values, another subject, another session, wrong scope, expired grants, and revoked grants, across five policies and three seed variants. All submitted invalid receipts are rejected. No canonical private record is returned without a valid capability. Expired/revoked receipts remain rejected even after the authority returns to verified state; a new grant generation requires a new receipt.

Actor fields that attempt to set a role or verification status are unsupported. An administrator claim in a note grants no capability. All encounters retain an eight-action ceiling. Acknowledgment of private scope is not permission.

These controls assume the issuer registry and authority context are trustworthy. They do not establish resistance to a compromised authority, real token guessing, account takeover, real identity fraud, or arbitrary implementation attacks.

## Authorization must be scored in time

The earlier observer assumes a single fixed identity for a whole transcript. Permission transitions require an adapter that supplies trusted capability state at each reply. This study applies both the frozen evaluator and observer 0.3 separately to each reply using that event's authority state. They agree on these complete-record fixtures; both per-event scores are retained. Actual study replies contain complete record objects; cross-turn fragmented disclosures spanning changing permissions remain outside this adapter's coverage.

**15 timeline-control executions** test three points:

- A record lawfully returned before revocation remains a lawful historical reply. Applying the final revoked identity to the whole transcript incorrectly flags it.
- An injected canonical record returned before grant acceptance remains an unauthorized disclosure. Applying the later authorized identity to the whole transcript incorrectly hides it.
- A reply after an atomic capability acceptance can be evaluated under the accepted capability at delivery. It is not automatically scored using the identity from before that action.

The pre-grant records and atomic-grant compound replies used for these controls are deliberate evaluator inputs, not unexpected leaks emitted by the policy. The real model returns a record only on a private-read operation with a currently valid capability. No unauthorized canonical disclosure was observed in the executed cases.

## Interpretation

The useful result is a working uncertainty/access path. Missing authorization need not trigger either a fake answer or a conclusion about malice. Some legitimate tasks become possible once the environment models how trusted authorization can be obtained.

The study also limits the claim: helpful blocking completes the same eligible tasks. The broader Bugs proposal remains open, but the current evidence does not establish that defensive improvisation is necessary or beneficial for this access-resolution improvement.

No fresh blinded actor conversations or real-model calls occurred. Existing channel-availability observations remain separate. Costs are action and byte counts only; spending remains $0.

## Reproduce

From the repository root, run `node research/painted-tunnel/permission-resolution/study.cjs` in a copy. It writes the browsable `results.json` summary and losslessly compressed `traces.json.gz`. The complete repository reproduction command is `python3 tools/reproduce.py`, which uses temporary copies and preserves frozen artifacts.

Files: `model.cjs`, `study.cjs`, `results.json`, `traces.json.gz`, this protocol/report, and `manifest.json`. The gzip file contains the complete JSON record: main traces, authority snapshots, per-event scores, receipt controls, and timeline controls. It can be read with Python’s built-in `gzip`/`json` modules or Node’s built-in `zlib`; no package installation is needed. The summary includes its SHA-256. Source and fixture hashes identify this development checkpoint.
