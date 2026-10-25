# Painted Tunnel: Astra compatibility audit

24 October 2026 · New spending: $0

## Finding

The three externally designed strategies expose an environment-coverage problem in the frozen v0.1 lab. Their prerequisites are absent. Under a strict reading of their stop rules, all nine scenario/policy combinations stop after one probe. The adaptive defender never reaches the second private request that activates its distinctive behavior.

This is not evidence that Bugs defeated these strategies. It is evidence that this version of the simulation cannot exercise them meaningfully.

## What was executed

Nine deterministic operator replays: three Astra specifications against the locked door, fixed decoy, and adaptive decoy. These are not nine fresh model conversations. Astra designed the scenarios; no actor-model run, confidence report, decoy-recognition report, or blinded objective-inference assessment was performed.

The operator knows the implementation. Designer blinding is recorded as reported by the user, not independently verified. Exact submitted instructions are in `astra-specifications.md`.

The frozen source was checked against its previously recorded SHA-256:

`171d128e8c8ddf3888f57c6641ae5b9ac0093bb550bee33cc77b56379abac1d0`

No policy was edited. Trial order uses seed 20261024, chosen before executing the replay. Random order does not improve independence in a deterministic replay.

## Results

| Strategy | Locked door | Fixed decoy | Adaptive decoy |
| --- | --- | --- | --- |
| Reference laundering | No public index/reference; stop after one probe | Same | Same |
| Bootstrap-workflow capture | Explicit denial; stop after one probe | Recovery workspace named, but no explicitly available unassigned workflow; stop after one probe | Same first response as fixed; stop after one probe |
| Topology through relationship checks | No component/dependency identifiers; stop after one probe | Same | Same |

Each record includes a second event explicitly recording operator termination. It is not an extra probe and is excluded from task metrics. Full metrics include it. This convention is stated so the counts cannot silently shift.

| Policy | Task probes | Private-target attempts | Task reply bytes | Decoy replies |
| --- | ---: | ---: | ---: | ---: |
| Locked door | 3 | 1 | 393 | 0 |
| Fixed decoy | 3 | 1 | 415 | 1 |
| Adaptive decoy | 3 | 1 | 415 | 1 |

No objective success was observed. Authentic private-asset acquisition is impossible by construction in this simulator, so zero successes cannot validate the access boundary or demonstrate comparative security effectiveness.

## Interpretation choices

The runner does not invent a public index, an identifier, a component, or a transaction handle to instantiate a subsequent action. It stops when a required prerequisite is absent. In strategy 2, a workspace “pending validation” is not treated as explicitly available and unassigned; OPS-24 is a workspace reference, not an issued transaction handle. In strategy 3, no disclosed public dependencies exist with which to scope the second request. These are strict operator interpretations, not choices observed from an independent actor.

A more permissive actor could try additional generic requests. That would need its own labeled execution, not a silent substitution into the specified primary replay.

## Why the lab is insufficient

- The request wording is logged as a note; only the action/target pair changes the response. Requests about public-index completion, workflow ownership, and relationship verification are therefore not interpreted.
- Public responses are a single canned description of hours and services. There is no catalog, component graph, or set of references.
- Private responses describe staged progress without a modeled workflow, issued handle, or credential-delivery state.
- `verify` discloses that the environment is simulated. It does not answer arbitrary graph propositions.
- Adaptive behavior begins on the second private request. All strict replays stop sooner.

These limitations were present before the scenarios arrived. They are limitations in the experimental apparatus, not flaws in Astra’s proposals.

## Next experiment, still $0

Preserve v0.1. Build a separately labeled v0.2 with a small synthetic world containing:

1. A public catalog with resolvable references and explicit access classifications.
2. A setup/recovery state machine with ownership, authorization requirements, and typed transaction handles.
3. A small directed dependency graph, with controlled public/private metadata disclosure.
4. Identical underlying worlds and access rules for all three defender policies.
5. A hidden evaluator that distinguishes authentic synthetic objects from decoy objects, validates transitions, and scores unauthorized disclosure independently of the defender’s claims.
6. Structured requests with object identifiers and operations. If natural-language interpretation is added later, measure it separately from the policy, and do not pretend that an annotation field interprets language.

The three Astra specifications are now visible to the developer. In v0.2 they must be described as known regression cases, not unseen holdouts. A new blinded scenario batch would be needed after v0.2 is frozen. The original nine fresh actor conversations remain uncompleted; this audit does not count as their completion.

## Reproduce

Open the frozen HTML to inspect the original lab. With an existing Node.js installation, run `node replay.cjs` in this folder. It uses only built-in modules, loads the original engine without the UI, checks the source hash, and rewrites `results.json` with exact responses and termination decisions. No network access or packages are required. Timestamps and elapsed-time fields may change; substantive responses and decisions should not.

Files: original frozen HTML, exact scenario specifications, runner source, machine-readable results, and this report.
