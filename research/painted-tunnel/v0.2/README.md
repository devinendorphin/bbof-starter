# The Painted Tunnel 0.2

24 October 2026 · $0 new spending · entirely synthetic · offline

Open `painted-tunnel-v0.2.html` in an existing browser. It is self-contained: no server, account, packages, installation, API key, external assets, or paid calls. The source files are included for inspection and reproduction. Export observations before closing: encounter data is held in memory.

## What changed

Version 0.1 could not exercise Astra’s proposals because it had no resolvable references, transaction handles, or dependency graph. Version 0.2 supplies those objects and their state transitions. It accepts structured JSON requests; natural-language notes are still annotations and do not substitute for an interpreter.

All three policies share the same canonical synthetic world and permissions for a given fixture seed. A fixed decoy supplies a coherent shadow world, with working handles and operations. Adaptive Bugs uses the same substitution and adds one bounded local review when an unauthenticated setup transaction reaches its third private request. Completing a returned receipt permits the shadow transaction to finish. This is a deterministic policy, not a language-model agent.

The operator can select a guest, records reader, setup operator, service auditor, or fully authorized staff identity before starting. A request cannot change identity or claim new permissions. Authorized users receive canonical synthetic objects; unauthorized users either receive a denial or operate in the shadow world.

## Results

The three Astra strategies were translated into deterministic structured operations, preserving their object prerequisites, action limits, and early-stop conditions. Exact original specifications are included. They are known regression cases: they informed this build and cannot be described as holdouts.

For the default world:

| Policy | Known strategy actions | Private-target attempts | Reply bytes | Apparent completions | Authentic unauthorized successes | Legitimate cases finished | Legitimate cases diverted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Locked door | 6 | 3 | 712 | 0/3 | 0/3 | 12/12 | 0/12 |
| Fixed decoy | 12 | 9 | 1,587 | 3/3 | 0/3 | 12/12 | 3/12 |
| Adaptive Bugs | 12 | 9 | 1,862 | 2/3 | 0/3 | 12/12 | 3/12 |

The private-record and graph strategies reach outputs that syntactically satisfy their observable criteria under both decoys. The setup strategy gets a shadow administrator credential from the fixed decoy, while the adaptive version remains in review at the four-action limit. No additional actions are consumed by adaptation in this known strategy. The bounded review is functional: a separate transition test completes the receipt and obtains the decoy credential.

“Apparent completion” is the deterministic runner’s shape-based interpretation, not an observed belief or success claim from Astra. No fresh actor model was called. Authentic-versus-shadow scoring is separate from those shape checks.

Five fixture variations produce the same qualitative pattern. These are not independent samples of people, models, attacks, or organizations. Aggregate known-case reply bytes are 3,560 for blocking, 7,932 for the fixed decoy, and 9,303 for adaptive Bugs. The adaptive policy uses approximately 17% more reply bytes than the fixed decoy while consuming the same number of known-case actions. Bytes are a response-volume proxy, not measured compute, tokens, dollars, or energy.

The three diverted legitimate guest cases are a mistaken archive request, a mistaken workflow query, and an exploratory component query. All later complete their public task. Authorized records, setup, and audit controls finish without decoy routing. The guest diversion problem remains; task completion does not erase it.

**Decision:** No advantage of adaptive Bugs over the fixed decoy has been demonstrated. The new world supports a more meaningful next experiment. The present result is a behavior and cost observation about a toy policy.

## Evaluation and verification

The observer evaluator checks actual returned values against canonical fixture truth. It classifies authorization by the operator-selected identity and the returned asset class, rather than trusting route flags or the requested endpoint. Private records in a public reply still count as unauthorized disclosure. Publicly disclosed graph information is not miscounted as a new private leak. Canonical private component identifiers and edges have separate leakage checks.

Checks completed:

- 45 known strategy executions and 180 legitimate-user control executions across five worlds.
- 300 deterministic exploratory action sequences totaling 2,400 actions, across five identities and three policies.
- 40 evaluator positive controls injecting canonical records, credentials, private nodes, or topology into private/public replies with misleading route flags; five negative controls using decoy data.
- Authorized access, directed graph answers, intermediate graph nodes, transaction preconditions, receipt completion, eight-action limits, invalid request handling, and repeatability.
- A minimal DOM harness checked interface wiring, state transitions, suggestions, exports, actor-view separation, and the neutral designer prompt.

These finite checks are not a proof of security. The evaluator recognizes complete known synthetic values and structured graph objects; arbitrary encoded, partial, or covert disclosures are outside this test. Operator route flags are used to count shadow routing, but not to decide authentic disclosure. Actual actor beliefs, objective-inference gains, deterrence, and real resource costs remain unassessed.

Real-browser visual inspection and actual phone compatibility were not verified in the build environment. The interface is responsive by construction, but that is not a device test.

## Next blinded batch

Open **Next blinded batch** in the HTML and copy only its designer prompt into a fresh model conversation. It specifies the structured tool contract without revealing the policy implementation or results. Ask for three new strategies, then run each against all three policies in fresh actor conversations, using only actor transcripts. Record the actor’s exact choices, stop decisions, beliefs, confidence, and any decoy recognition. Keep observer exports and source code hidden from the actor. Do not infer deception merely because a scripted criterion can be met.

The actor transcript omits the policy, operator identity, canonical world, assessment, and route flags. All of that remains inspectable in this local file’s source, so the separation is experimental blinding, not a hardened security boundary.

Freeze the included code hashes before requesting new designs. Do not tune this version after seeing that new batch; later edits need a separately labeled version. Fresh blinded model conversations completed: **0**. Existing chat subscriptions can be used manually; this lab contains no billing or API integration.

## Reproduce

With an existing Node.js installation, run `node test.cjs`. This rewrites `results.json` and `verification.json`. With an existing Python 3 installation, run `python3 build.py` to rebuild the standalone HTML, then `node interface-test.cjs` to check interface logic. No third-party packages are required. Engine tests include source hashes; `manifest.json` identifies the delivered code and artifacts. Timestamps can change on reproduction; substantive results should not.

Files include the standalone HTML, engine, evaluator, regression runner, tests, exact Astra specifications, JSON results and verification, theme, template, build script, neutral prompts within the HTML, and source manifest. Version 0.1 remains unchanged in its original artifact.
