# Bugs Bunny Optimization Framework

BBOF investigates bounded defensive deception: whether a system can recognize manipulation, redirect an encounter, and relinquish its defensive role while preserving ordinary users' access and recourse.

The repository contains the original February 2026 Python prototype and the October 2026 **Painted Tunnel** experimental series. The latter uses local synthetic worlds and scripted actors. It has not demonstrated a general advantage for adaptive deception, and it does not implement an autonomous improvisational entity or a production security service.

## Start here

- [Research archive and chronology](research/painted-tunnel/README.md)
- [Current roadmap](ROADMAP.md)
- [Independent pilot: ready-to-copy first prompt](research/painted-tunnel/independent-pilot/START_HERE.md)
- [Pilot recorder and status](research/painted-tunnel/independent-pilot/README.md)
- [Latest overlapping-prefix information study](research/painted-tunnel/overlapping-prefix/REPORT.md)
- [Permission-resolution study](research/painted-tunnel/permission-resolution/REPORT.md)
- [Decision and clarification study](research/painted-tunnel/decision-study/REPORT.md)
- [Observer 0.3 and its remaining limits](research/painted-tunnel/observer-0.3/REPORT.md)
- [Original concept paper](Brainstorming%20Bugs%20Bunny%20Optimization%20Framework.txt)

Download [the standalone v0.2 HTML lab](research/painted-tunnel/v0.2/painted-tunnel-v0.2.html) and open it in an existing browser. GitHub's file view does not run it. No server, API key, model installation, or paid service is needed. Actual browser appearance and phone compatibility remain unverified in the build environment.

## Findings so far

- The first lab lacked objects needed by externally designed strategies. That limitation was recorded rather than counted as defensive success.
- The richer v0.2 world supports catalogs, typed recovery transactions, and directed graph queries. Its extra-review policy produces more output without additional actor actions in the original known strategies.
- The effect changes when the scripted actor follows, abandons, or retries a review. Scripted persistence is not evidence that an independent actor was deceived.
- Observer 0.3 recognizes selected fragmented and prose disclosures missed by the earlier scorer. Known coverage gaps remain explicit; original and revised scores are retained together.
- A separate clarification candidate reduces shadow routing in the known mistaken-request cases, with extra response volume. It cannot distinguish benign from malicious private intent when the observable traces are identical.
- Episodes established as compliant with the blinded pilot protocol: **0**. A withheld designer response is documented separately from experiment outcomes.

- The new permission model completes eligible tasks with neutral resolution or helpful blocking, rejects the selected invalid receipts, and scores authorization at each reply. This does not establish a unique advantage for trickster behavior.

A six-episode independent-actor pilot kit is prepared, including separate assessor prompts and a local raw-response recorder. [The first user-relayed episode](research/painted-tunnel/pilot-relay/README.md) has now closed: a completion claim followed a shadow record. A subsequent user-relayed assessor response distinguishes apparent completion from unknown authenticity and permission, while failing the strict output schema through an extra field. The user confirms separate fresh chats and packet-only exposure. The actor's first reply required transport normalization and the assessor added an extra field, so this remains an exploratory relay rather than a strict-protocol result. Controller development checks remain separate from received responses. [P02](research/painted-tunnel/pilot-relay/P02-REPORT.md) subsequently closed with an explicit stop on action eight after two permission denials, with no recovery output. Its received assessor response identifies apparent incompletion at confidence 0.8 and satisfies the strict JSON schema; the assessor is user-labeled Claude Opus 5.5 and P02 context/source confirmation remains pending.

The overlapping-prefix study adds 675 scripted episodes and 120 authorization controls. Engagement reveals some assigned resource goals, but both decoys provide the same final goal information as helpful blocking. Misleading requests produce observer errors; identical motive-narrative pairs remain indistinguishable.

These findings concern development examples and finite synthetic fixtures. Actor belief, real protection, general intent recognition, independently validated intelligence gains, and actual operating-cost advantages remain unmeasured.

## Reproduce without paid services

Requirements: an existing Python 3 and Node.js installation; no third-party packages for the canonical local suites.

```bash
python3 tools/check_archive.py
python3 tools/reproduce.py
```

The reproduction command runs each historical suite in its own temporary copy, preserving frozen timestamps and manifests. Optional Playwright scripts record an attempted browser check; they are not part of the dependency-free suite.

## Original Python prototype

```bash
python3 bbof_starter.py
python3 analyze_logs.py bbof_telemetry.jsonl
python3 evaluate_harness.py
```

The original runtime contains a heuristic classifier, policy router, deterministic T3/T5 persona stubs, safety governor, and telemetry harness. Historical thresholds and metrics are small-suite development results, not validated production settings. Real-model integration has not occurred.

## Scope and provenance

All new experiments remain local and synthetic, with **$0 new spending**. There are no live targets, outbound interference, real credentials, or unattended paid calls. Synthetic credential-shaped values are fixture data. Authorization is an explicit test input, not an inference from a person's style or identity.

The February source files and paper remain in place. Prior root documentation is preserved under [docs/history](docs/history). The complete October artifacts, including original ZIP deliverables, remain under `research/painted-tunnel/`. [The archive manifest](research/painted-tunnel/ARCHIVE_MANIFEST.json) identifies imported files by hash. The user-provided screenshot itself and unrelated account/workspace material are not included; the research observation retains its provenance metadata.
