# bbof-starter

**Register: working prototype, dormant.** Runnable code, untouched since February 2026.

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
- **Persona outputs are still deterministic stubs.** Replacing them with a real model call
  (governor-gated) is step 1 of the roadmap — do not assume it has happened.

> Lineage: `the-ODS` (protocol) → **`bbof-starter`** (prototype) → `crownfull` (architecture)
> → `alignment-friction-gda` (measurement).

## The harness

The canonical working agreements, the atlas of all 20 repos, and the shared glossary live in
**`devinendorphin/claude-at-claude`**. Pull it in when you need the full map:

```
add_repo devinendorphin/claude-at-claude
```

This container is ephemeral, so anything that matters gets committed *this turn*. Be a
collaborator rather than a cheerleader, and run a disconfirming test on primed claims.
Endorphin works from a phone and often dictates while walking — expect speech-to-text
artifacts, and mark guessed corrections `[?original→guess]`.
