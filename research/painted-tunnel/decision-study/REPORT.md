# Painted Tunnel: deciding when to become the trickster

24 October 2026 · New spending: $0

This inquiry adds a response-sensitivity study and one separately labeled clarification candidate. Defender v0.2 and observer 0.3 remain unchanged. No model was called, no withheld response was reconstructed, and no external system was involved.

The main finding is that our current review-step policy measures a narrow mechanism. Its apparent advantage depends strongly on how the actor responds. A simple clarification step improves one known legitimate-user metric, while a constructed counterexample shows why confirmation is not a test of malicious intent.

## 1. The known goals were already distinguishable

In all 45 existing known strategy executions, a post hoc classifier could identify the assigned goal from the first private request alone:

- Archive request: the record strategy.
- Workflow request: the credential strategy.
- Component query: the topology strategy.

For each seed and strategy, the request prefix up to that point is identical across the three defender policies. Therefore later dialogue is unnecessary to distinguish these three labels in this particular dataset. This is retrospective label separability, not a blinded observer result and not evidence that real adversarial intent is easy to infer.

The original dataset does not offer a strong test of whether adaptive engagement elicits additional useful goal information. Better tests need different plausible goals with overlapping observable prefixes. Counting additional messages alone cannot repair that design limitation.

## 2. The review step's effect depends on the actor

Four authored workflow-response rules were run under the frozen policies in five synthetic worlds. They are sensitivity assumptions, not independent attackers or predictions of how often each behavior occurs.

| Scripted response to a pending review | Fixed decoy actions per encounter | Adaptive review actions per encounter | Difference |
| --- | ---: | ---: | ---: |
| Stop at the strategy's four-action limit | 4 | 4 | 0 |
| Follow the returned review instruction | 4 | 5 | +1 |
| Leave when a review appears | 4 | 3 | −1 |
| Keep retrying delivery to the global limit | 4 | 8 | +4 |

Blocking ends each workflow attempt after one denied request under these actor rules. Both deception policies return only shadow credentials in these tests. Observing more or fewer actions does not establish useful intelligence, actual human belief, measured compute cost, or successful real-world protection.

Across five fixture variants, the fixed-decoy workflow produces 1,829 reply bytes for each behavior. Adaptive output ranges from 2,616 bytes when the actor leaves on review to 5,536 bytes when it keeps retrying. Even the actor who leaves sooner receives more output than under the fixed decoy. The actor who follows the review takes one additional action, with 3,371 reply bytes.

The present adaptive policy is a deterministic extra review, rather than the broader improvisational entity originally proposed. These results constrain that review mechanism. They cannot establish that every possible trickster defender is ineffective.

## 3. A separate candidate: clarify scope before using a decoy

`clarification.js` is an experimental wrapper around the unchanged defender. On a guest request for a private scope it offers a neutral choice: return to public information, stop, or explicitly confirm the same request. Acknowledgment does not grant authorization. Authorized identities do not receive this extra question for their permitted scope.

The wrapper uses request scope and operator-set permissions. It receives no benign/adversarial scenario label, no sentiment score, no persona judgment, and no hidden actor objective. It has the same eight-total-action ceiling. A confirmation must match a pending request; an unprompted confirmation or an attempted identity change is rejected.

The existing legitimate-user action traces were replayed both with and without clarification. Each policy has 60 cases: 12 known scripts across five fixture variants.

| Policy | Shadow-routed cases without clarification | With clarification | Tasks completed in either condition |
| --- | ---: | ---: | ---: |
| Blocking | 0/60 | 0/60 | 60/60 |
| Fixed decoy | 15/60 | 0/60 | 60/60 |
| Adaptive decoy | 15/60 | 0/60 | 60/60 |

In the known mistaken-request scripts, the next action is already a return to public information. The neutral question replaces a decoy reply, so they avoid shadow routing without adding actions. Authorized records, workflow, and graph controls remain functional. These are controlled replays of known behavior; no actual person was observed reading or accepting a clarification.

There is an output cost. For the fixed and adaptive decoys, clarification increases total legitimate-case reply bytes from 14,953 to 16,525, about 10.5%, while total actor actions stay at 130. Under blocking, reply bytes rise from 14,140 to 16,525 with no shadow-routing improvement. This is a tradeoff, not a universal win. JSON bytes remain only an output-volume proxy.

## 4. The counterexample: legitimate private intent

We also assigned a legitimate-intent narrative to a guest who knowingly requests private records but lacks a modeled session capability. That actor confirms the scope question and continues.

The wrapper adds one action. Under either deception policy the actor still enters the shadow world. No canonical record is obtained. The modeled system has no in-session onboarding or authorization-resolution path that can satisfy this legitimate request. Clarification cannot supply the missing authorization mechanism.

Without the wrapper, the complete observable request/reply trace is identical to the known record-seeking intruder trace for the same fixture and policy. This equality was checked for all three policies. The two different intent labels were assigned outside the system; they were not inferred from behavior.

The implication is a basic identifiability constraint: a defender receiving identical observable histories cannot reliably distinguish those externally assigned intentions from that history alone. Acknowledgment demonstrates that the actor chose to continue a private request. It does not establish malice, entitlement, identity, or consent to being deceived.

This constructed pair does not show that real benign and malicious users always behave alike. It shows why unauthorized access requests cannot automatically be treated as a dependable psychological classification.

## What this changes in the inquiry

The next useful design target is the decision to enter trickster mode: how to preserve a neutral path for uncertainty, resolve ordinary access problems, and keep any deception confined to a controlled surface. The broader Bugs proposal should be tested against a richer baseline than “always add another review.”

Three goals should be kept separate in subsequent versions:

1. Correct authorization decisions and a usable legitimate-access path.
2. Avoidable burdens and shadow routing for ordinary users.
3. Measurable benefit from engagement, such as information unavailable from the initial request or an independently justified reduction in harmful activity.

This round provides a candidate and a counterexample, not a deployment recommendation. Improving one known routing metric does not establish trustworthiness, net protective value, realistic costs, or generalized intent recognition. The channel restriction and absence of fresh blinded actor conversations remain limitations. New spending stays at $0.

## Reproduce

The package includes `clarification.js`, `study.cjs`, `study-results.json`, this report, a complete `frozen-v0.2` folder, and the unchanged observer 0.3 source. With an existing Node.js installation, run `node study.cjs`. It verifies frozen hashes, checks the known request prefixes, runs 60 workflow sensitivity encounters, replays 360 legitimate-user conditions, runs six intentional-private sensitivity cases, and checks wrapper authorization/confirmation limits. These counts are program executions, not people or independent model samples.

No packages or network are required. Timestamps may change; substantive outcomes should not. The clarification candidate has no browser interface and was not tested with human users. Its code and results are preserved separately from the frozen baseline.
