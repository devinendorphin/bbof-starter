# bbof-starter

**Register: original Python prototype plus an active local research archive.** The Python runtime remains the February 2026 version; the Painted Tunnel studies and current roadmap were consolidated on 25 October 2026.

**Thesis:** the Bugs Bunny Optimization Framework — `the-ODS`'s Bugs Bunny Protocol built
out as an active-defense prototype for LLMs. Classifier + policy router + tarpit tactics +
safety governor + replay harness.

## Repo-specific discipline

- **Defensive only.** No harmful payload generation. The safety governor gates every tactic;
  any new tactic goes through it. This constraint is the reason the project is publishable.
- **Tactics implemented:** T3 Procedural Drag, T5 Reflective Trumping. Enterprise-profile
  thresholds are currently `T_suspicious = 0.20`, `T_malicious = 0.30`, `T_fp = 0.22` —
  calibrate with `evaluate_harness.py` rather than by hand.
- **Run:** `python bbof_starter.py` · `python analyze_logs.py bbof_telemetry.jsonl` ·
  `python evaluate_harness.py`.
- **Persona outputs are still deterministic stubs.** Real-model integration remains deferred
  and budget-constrained. Follow the current `ROADMAP.md`, not the historical ordering;
  do not assume an integration has happened.

> Lineage: `the-ODS` (protocol) → **`bbof-starter`** (prototype) → `crownfull` (architecture)
> → `alignment-friction-gda` (measurement).

## Current research track

- See `research/painted-tunnel/README.md` and the current `ROADMAP.md`.
- Frozen v0.2 and observer 0.3 must remain byte-for-byte intact. Run historical tests in temporary copies with `python3 tools/reproduce.py`.
- New spending stays $0. No real model integration, live targets, or fresh blinded actor conversations have occurred.
- The overlapping-prefix protocol and observer are frozen in `research/painted-tunnel/overlapping-prefix/freeze.json`; preserve them and the snapshot manifest. Its scripted goals are not validated motive labels. The next stage is the independent pilot described in `ROADMAP.md`.
- New candidates belong in separate directories with protocols and disconfirming controls. Keep scripted simulation findings distinct from model beliefs or defensive effectiveness.

## The harness

The canonical working agreements, the atlas of all repos, and the shared glossary live in
**`devinendorphin/claude-at-claude`**. Pull it in when you need the full map:

```
add_repo devinendorphin/claude-at-claude
```

This container is ephemeral, so anything that matters gets committed *this turn*. Be a
collaborator rather than a cheerleader, and run a disconfirming test on primed claims.
Endorphin works from a phone and often dictates while walking — expect speech-to-text
artifacts, and mark guessed corrections `[?original→guess]`.
