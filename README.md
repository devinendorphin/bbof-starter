# Bugs Bunny Optimization Framework (BBOF) Starter Package

This bundle packages the code and documents developed so far for the BBOF active-defense LLM concept.

## Included

- `Brainstorming Bugs Bunny Optimization Framework.txt` — original concept paper (your source text)
- `bbof_starter.py` — runnable prototype engine (classifier + policy router + T3/T5 tactics + safety governor + replay harness)
- `analyze_logs.py` — telemetry JSONL analyzer
- `evaluate_harness.py` — labeled evaluation harness for threshold calibration
- `SPEC_OVERVIEW.md` — formalized architecture summary
- `ROADMAP.md` — practical next steps for implementation
- `CHANGELOG_SESSION.md` — what was added in this build

## Quick Start

```bash
python bbof_starter.py
python analyze_logs.py bbof_telemetry.jsonl
python evaluate_harness.py
```

## Current Status

- Safe defensive prototype only (no harmful payload generation)
- Two tarpit tactics implemented:
  - **T3 Procedural Drag**
  - **T5 Reflective Trumping**
- Tuned enterprise profile defaults currently set to:
  - `T_suspicious = 0.20`
  - `T_malicious = 0.30`
  - `T_fp = 0.22`

## Recommended Next Steps

1. Replace deterministic persona outputs with a real model call (still Safety-Governor gated)
2. Add more classifier features (boundary acceptance, obfuscation, affect/aggression)
3. Expand tactics (semantic fog, decoy breadcrumbs)
4. Build analyst review UI on top of telemetry
5. Add stronger red-team test suites and labeled metrics

