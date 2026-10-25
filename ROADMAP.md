# BBOF research roadmap

Updated 25 October 2026. Budget ceiling: **$0 new spending**. Original February roadmap: [archived copy](docs/history/ROADMAP-before-2026-10-25.md).

This roadmap develops a research instrument before making claims about a general trickster defender. Each study states what it can falsify. Previously frozen versions and scores stay available.

## 0. Consolidate and reproduce — current publication checkpoint

- [x] Preserve the original prototype and concept paper.
- [x] Gather Painted Tunnel v0.1/v0.2, Astra compatibility audit, measurement audit, observer 0.3, clarification candidate, results, and ZIP deliverables.
- [x] Index the archive and retain source hashes.
- [x] Provide a dependency-free reproduction entry point that does not mutate frozen artifacts.
- [x] Verify the public GitHub commit and repository head after publication. Archive checkpoint: [`90a9e0a`](https://github.com/devinendorphin/bbof-starter/commit/90a9e0a7242bc0992512b0859648f52c9b2f0b4b).

## 1. Legitimate access and abstention — local development study completed

**Question:** Can neutral permission resolution help a legitimate requester without granting access based on a claim or treating missing authorization as malice?

Compare the existing policies with a separate permission-resolution candidate. Include verified, denied, pending/unavailable, expired, and revoked authorization states. Use pairs with identical initial requests and different operator-known authorization outcomes. Keep intent labels outside the policy.

A simulated trusted authority may grant a narrowly scoped capability to an entitled test identity. Actor-provided role claims and fabricated receipts must not grant access. This is synthetic state, not a real identity service.

Measure canonical task completion for authorized cases; shadow routing or fake-private answers to legitimate requesters; unsupported permission transitions; actions and request/reply bytes; unauthorized canonical disclosure under both observers; and explicit unresolved outcomes.

**Disconfirming case:** a requester with private intent but no verifiable capability remains unresolved. The policy must not guess entitlement. Success in this stage means better handling of the chosen authorization fixtures, not general malicious-intent detection.

Completed on 25 October: [permission-resolution protocol and results](research/painted-tunnel/permission-resolution/REPORT.md). The study has 240 main cases, 90 invalid-receipt cases, and 15 timeline-control executions. Helpful blocking and neutral resolution both complete 12/12 eligible cases; neutral handling does not demonstrate a unique trickster advantage. These are known developer-authored fixtures, with no independent actor validation.

## 2. Overlapping-prefix information study — local development study completed

**Question:** Does engagement reveal useful information that the first request did not already reveal?

Build mixed-goal scripted cases with shared observable prefixes. Freeze a protocol and a simple observer before generating additional fixture variants. Compare incremental objective information, abstention, legitimate-user costs, and output volume. Report the constructed nature of the labels. Identical observable traces cannot justify different intent conclusions.

**Disconfirming case:** more conversation adds no reliable label information or costs more than it contributes. No claim of a blinded result is allowed for developer-authored actors.

Completed on 25 October: [protocol, results, and limitations](research/painted-tunnel/overlapping-prefix/REPORT.md). Protocol and observer were committed before fixture implementation. The study ran 675 scripted episodes and 120 authorization controls. Helpful blocking, clarification, and both decoys yield the same final 0.551 bits of assigned-goal information in the primary mixture; motive narratives remain indistinguishable. The observer makes errors on mimic requests. Helpful blocking and neutral clarification complete 18/18 entitled-but-unverified tasks each; the decoys substitute fake output in those cases. The proposed unique information advantage for these decoys is unsupported in this fixture set.

## 3. Independent assessment and actor pilot — kit prepared; external decisions pending

Obtain independently designed cases and fresh actor choices only through available, permitted channels. Keep source, policies, and observer truth hidden from the actor. Record exact model labels, dates, prompts, choices, confidence, and stopping decisions. Do not replace unavailable responses with invented holdouts or count a channel restriction as defensive success.

Use existing subscription allowances if a manual pilot becomes possible; no API spending or unattended model calls are authorized by this roadmap. The blocked Astra design batch remains unavailable.

Next concrete work: prepare a versioned pilot packet using the frozen menus and observer; include helpful blocking as the baseline; obtain genuinely fresh actors through a permitted channel; record the actual behavior rather than forcing the scripted continuation. Separate an independent policy assessor from the acting participant. Keep assigned task, observed resource choice, claimed motive, authorization, and completion as separate fields. Count unavailable channels and unreceived responses explicitly. If a suitable channel is unavailable, preserve the zero-actor status and prepare the packet rather than relabeling another developer-written batch as independent validation. Cap the initial pilot at existing allowances and eight actions per episode. Keep resource-accounting stage 4 separate until actual timing/usage is measured.

Prepared on 25 October: [manual pilot kit](research/painted-tunnel/independent-pilot/README.md) and [first phone-friendly actor handoff](research/painted-tunnel/independent-pilot/START_HERE.md). The frozen six-episode plan compares helpful blocking with a static decoy within three matched conditions. The recorder preserves raw replies and provenance, separates actor/assessor contexts, checks deterministic replay, and scores canonical completion separately from self-reported completion. Thirteen development control groups pass. No independent model endpoint was available in the preparation session; **received independent actor responses: 0; assessor responses: 0; new spending: $0**. This is completed preparation, not completed independent validation.

The immediate next action is to pass the prepared prompt to a genuinely fresh conversation through an existing, permitted allowance, then record the exact response and continue that episode using only generated actor packets. A different fresh context handles assessment after closure. If the channel is unavailable, record that outcome without inventing a trial. Complete at most the six planned episodes before revising the protocol; do not claim statistical generalization from the convenience pilot. If no fresh channel becomes available, stage 3 stays pending. Stage 4 may prepare local instrumentation separately, but cannot stand in for independent validation.

User-relay update, 25 October: [P01 receipt and assessor handoff](research/painted-tunnel/pilot-relay/README.md). Two responses labeled Astra 6 were relayed by the user, closing the first episode after three service actions. The participant claimed completion with confidence 1.0 after a shadow record; canonical completion was false. Provider/context/source provenance remains unconfirmed, and the first relay required mechanical underscore unescaping. It is an exploratory continuation rather than a strict-protocol result. Assessor responses remain zero. Next: collect the separate assessment, resolve provenance, and continue the fixed plan in fresh contexts; do not count P01 as established blinded validation or a malicious-actor success.

## 4. Resource accounting and bounded runtime

Separate request bytes, response bytes, actual local execution time, concurrency limits, and any measured model usage. Test fixed action/output ceilings and recovery to ordinary service. A resource estimate must specify its units. More actor actions, larger transcripts, or a theatrical response do not establish net protective benefit.

## 5. Broader trickster architecture — contingent research

Only after the preceding instruments are useful, investigate a role-switching agent with bounded memory, explicit authority, an uncertainty state, and a reliable exit from defensive behavior. Preserve the independent governor and operator visibility described by the original prototype. Keep experiments local unless a separate, concrete deployment is requested and authorized.

The larger conceptual question remains open: what can an agent do by changing an encounter that a static refusal or a coherent fixed decoy cannot do? A deterministic extra review is one narrow mechanism, not a test of every possible answer.

## Version discipline

New candidates live in separate directories. Frozen v0.2 and observer 0.3 remain unchanged. Historical negatives, unsupported representations, and failed interface checks stay visible. A completed stage must link to code, protocol, results, and its practical limits.
