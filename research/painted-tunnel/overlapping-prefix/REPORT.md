# Overlapping-prefix information study 0.1

Completed 25 October 2026. **Interaction exposed some assigned resource goals, but deception added no final goal information beyond a helpful denial with the same public choices.** Misleading requests defeated the simple observer, and different motive narratives attached to identical behavior remained indistinguishable. Helpful blocking and neutral permission handling preserved legitimate task completion; the decoys substituted fake results.

These are developer-authored synthetic episodes, not independent actors, real intrusions, or evidence of belief. New spending: **$0**. Fresh blinded model-actor conversations: **0**.

## Design and freeze

The [protocol](PROTOCOL.md), [request-only observer](observer.cjs), and [hash lock](freeze.json) were committed in [`e17a773`](https://github.com/devinendorphin/bbof-starter/commit/e17a77307c0608568381f90ecd48a5ddb8509524) before the fixture implementation was written. This is a verifiable development checkpoint, not an independent preregistration. The observer and protocol were not amended during the study.

Five separate portal fixtures compare bare blocking, helpful blocking, neutral objective clarification, a static coherent decoy, and a decoy with a bounded review. All ordinary actors begin with exactly `open_portal`, a private-portal request containing no objective. Every policy except bare blocking exposes the same public choices: archive record, administrator-recovery output, or dependency topology. Public choices and acknowledgments grant no permission. Verified scoped capabilities bypass challenges; all policies support the same verification API. These fixtures do not modify the frozen v0.2 engine or observer 0.3.

Three worlds vary synthetic identifiers and payloads. Five programs make a direct resource choice, inspect once before choosing, request archive regardless of assigned goal, probe all three resources, or stop early. Programs respond to visible histories; they receive no policy identity, authority internals, canonical truth, or evaluator scores. An assigned goal is a driver input, not proof of a real intention. In particular, an actor can be assigned topology while visibly asking only for archive.

The primary comparison has **450 episodes**: three worlds × five policies × three assigned goals × five programs × two external motive narratives. The two narratives in each pair run the same program under the same denied authority. Thus motive indistinguishability is a deliberate control, not a surprising discovery. Another **225 legitimate controls** cover entitled-but-unverified users, existing grants, unavailable verification, and actors that explicitly request verification first. Total: **675 episodes**, each capped at eight actions including stop.

## Information after the shared request

The frozen observer labels a resource only when all observed `read_goal`/`declare_goal` requests name one distinct resource. Conflicting or absent evidence causes abstention. It always abstains on motive. A single consistent request can still be misleading.

Information is computed separately from this heuristic: group exactly identical visible transcript prefixes and calculate the reduction in uncertainty about assigned labels. With three equally frequent goal labels, initial uncertainty is about 1.585 bits. These finite-fixture values describe the chosen mixture; they are not learned-model accuracy, a calibrated confidence score, or a generalization estimate.

Each row below covers the policy's 90 primary episodes. Final means at most eight actor actions, retaining shorter stopped traces.

| Policy | Goal information after action 1 | Final goal information | Final motive information | Correct / wrong / abstain |
| --- | ---: | ---: | ---: | ---: |
| Bare blocking | 0 bits | 0 bits | 0 bits | 0 / 0 / 90 |
| Helpful blocking | 0 bits | 0.551 bits | 0 bits | 42 / 12 / 36 |
| Neutral clarification | 0 bits | 0.551 bits | 0 bits | 42 / 12 / 36 |
| Static decoy | 0 bits | 0.551 bits | 0 bits | 42 / 12 / 36 |
| Adaptive decoy | 0 bits | 0.551 bits | 0 bits | 42 / 12 / 36 |

For each engaging policy, conditional accuracy among predictions is **42/54 = 77.8%**; correct labels across all cases are **42/90 = 46.7%**. Calling the former “77.8% intent detection” would be wrong. Both the target and the denominator matter.

The direct and delayed programs reveal their assigned goals exactly. The mimic program is labeled archive in every case and is wrong in 12/18 cases per engaging policy. All-resource probing eventually causes abstention. Early exits reveal nothing. Within the full mixture, some direct archive episodes also look exactly like mimic episodes; the observer cannot condition on a hidden program label. Even a retrospective majority classifier using full visible traces could label at most **54/90 = 60%** correctly in this balanced distribution. That is a trace-collision ceiling, not a trained predictor.

Earlier horizons are retained in [results.json](results.json). At action three, neutral clarification and adaptive review still have 24 wrong predictions each; helpful blocking and static decoy have 12. Extra stages can postpone contradictory evidence rather than resolve uncertainty. Every engaging policy reaches the same final information. No inference here establishes entitlement or permission.

All **225 narrative pairs** have exactly equal visible histories and authority events. All **45 goal-ambiguity groups** (world × policy × mimic/probe/stop) have identical traces across assigned goals. A counterfactual control pools three cyclic permutations of the hidden goal labels, reusing the same traces: goal information becomes zero. These are analytical relabelings, not 1,350 extra actor executions or a blind holdout.

## Legitimate access and interaction volume

The entitled-but-unverified controls contain 18 episodes per policy: three worlds × three goals × direct/delayed behavior. A capability must be acquired through verification. The actor stops after receiving an output-shaped result; this is a program rule, not evidence that it believed the result.

| Policy | Entitled tasks completed | Entitled episodes given fake output | Already granted tasks completed | Authorization-first tasks completed |
| --- | ---: | ---: | ---: | ---: |
| Bare blocking | 0/18 | 0/18 | 9/9 | 9/9 |
| Helpful blocking | 18/18 | 0/18 | 9/9 | 9/9 |
| Neutral clarification | 18/18 | 0/18 | 9/9 | 9/9 |
| Static decoy | 0/18 | 18/18 | 9/9 | 9/9 |
| Adaptive decoy | 0/18 | 18/18 | 9/9 | 9/9 |

The authorization-first controls demonstrate dependence on actor behavior: every policy can serve these entitled users when they explicitly acquire a capability. The decoy completion failure above is caused by this actor's early acceptance of output shape, not an absence of a verification API. Existing grants bypass every challenge. With verification unavailable, helpful blocking and neutral handling explicitly report an unresolved outcome in 9/9 cases; both decoys supply fake output in 9/9. Bare blocking reports only denial.

To compare information and volume on the same denominator, the next table uses **only the 90 primary episodes per policy**, excluding legitimate controls. Bytes count serialized JSON in UTF-8; actions include stop. They are neither tokens nor money.

| Policy | Actor actions | Request bytes | Reply bytes | Episodes with fake private output |
| --- | ---: | ---: | ---: | ---: |
| Bare blocking | 180 | 3,690 | 6,570 | 0 |
| Helpful blocking | 360 | 10,848 | 49,272 | 0 |
| Neutral clarification | 378 | 11,496 | 60,504 | 0 |
| Static decoy | 306 | 8,448 | 72,330 | 72 |
| Adaptive decoy | 414 | 17,256 | 94,422 | 72 |

The static decoy uses fewer actions than helpful blocking because these scripts stop on fake output. It emits more reply bytes and gains no additional final objective information. The adaptive decoy adds review actions and reply bytes with no final information gain. Neither observation establishes attacker distraction, elapsed-time benefit, or economic advantage.

## Authorization and verification

No unauthorized canonical marker appears in the 675 policy episodes. **120 additional controls** test forged receipts, wrong subject/session/scope, use of an archive grant for recovery, review acknowledgment without a grant, authority claims in notes, and rejected role fields. All pass. The receipt registry and trusted decision are simulated; this is not a production identity service.

Canonical output and marker checks use the valid capability for the specific resource **at reply delivery**. Complete canonical records, administrator values, and private topology node identifiers are covered. Injected full-output and prose-marker controls confirm that the scorer detects these chosen leaks; the injections are evaluator tests, not engine failures. This scorer is separate from both historical disclosure scorers and makes no claim to handle arbitrary fragmented, transformed, or encoded content.

Seven additional control groups verify observer edge cases, action limits, early stop, scorer sensitivity, marker separation, actor determinism, and information arithmetic on known independent/perfect signals. [verify.cjs](verify.cjs) checks all snapshot hashes, executes the study again, and requires byte-identical generated results and compressed traces. The repository reproduction command also runs all prior suites in isolated copies and checks the original import archive.

## Reproduce and inspect

From the repository root:

```bash
python3 tools/check_archive.py
python3 tools/reproduce.py
```

For this snapshot alone, `node research/painted-tunnel/overlapping-prefix/verify.cjs` verifies and deterministically rewrites the same generated files. Node.js and Python 3 are the only requirements. No hosting, account, API key, paid model, package download, or new infrastructure is needed.

- [Model](model.cjs), [actor programs](actors.cjs), and [study/scorer](study.cjs)
- [Summary with all horizons and per-program breakdowns](results.json)
- [Complete compressed histories, separate truth, authority events, and control results](traces.json.gz)
- [Source/data hashes](manifest.json) and [design freeze](freeze.json)

The supported conclusion is narrow: these interactions reveal observable resource choices, and a helpful public menu yields the same final assigned-goal information as these decoys. They cannot certify sincere goals or motive. The next roadmap stage requires independent actor choices and assessment before expanding the architecture or claiming a trickster advantage.
