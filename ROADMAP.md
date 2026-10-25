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

## 2. Overlapping-prefix information study — next research stage

**Question:** Does engagement reveal useful information that the first request did not already reveal?

Build mixed-goal scripted cases with shared observable prefixes. Freeze a protocol and a simple observer before generating additional fixture variants. Compare incremental objective information, abstention, legitimate-user costs, and output volume. Report the constructed nature of the labels. Identical observable traces cannot justify different intent conclusions.

**Disconfirming case:** more conversation adds no reliable label information or costs more than it contributes. No claim of a blinded result is allowed for developer-authored actors.

## 3. Independent assessment and actor pilot — pending channel availability

Obtain independently designed cases and fresh actor choices only through available, permitted channels. Keep source, policies, and observer truth hidden from the actor. Record exact model labels, dates, prompts, choices, confidence, and stopping decisions. Do not replace unavailable responses with invented holdouts or count a channel restriction as defensive success.

Use existing subscription allowances if a manual pilot becomes possible; no API spending or unattended model calls are authorized by this roadmap. The blocked Astra design batch remains unavailable.

## 4. Resource accounting and bounded runtime

Separate request bytes, response bytes, actual local execution time, concurrency limits, and any measured model usage. Test fixed action/output ceilings and recovery to ordinary service. A resource estimate must specify its units. More actor actions, larger transcripts, or a theatrical response do not establish net protective benefit.

## 5. Broader trickster architecture — contingent research

Only after the preceding instruments are useful, investigate a role-switching agent with bounded memory, explicit authority, an uncertainty state, and a reliable exit from defensive behavior. Preserve the independent governor and operator visibility described by the original prototype. Keep experiments local unless a separate, concrete deployment is requested and authorized.

The larger conceptual question remains open: what can an agent do by changing an encounter that a static refusal or a coherent fixed decoy cannot do? A deterministic extra review is one narrow mechanism, not a test of every possible answer.

## Version discipline

New candidates live in separate directories. Frozen v0.2 and observer 0.3 remain unchanged. Historical negatives, unsupported representations, and failed interface checks stay visible. A completed stage must link to code, protocol, results, and its practical limits.
