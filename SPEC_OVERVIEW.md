# BBOF Specification Overview

## Goal
Turn passive refusal into **active defensive friction** for likely jailbreak attempts while protecting benign users.

## Runtime Layers

1. **Intent Classifier**
   - Scores refusal suppression, authority claims, exfiltration, actionability, retry persistence, benign context
   - Produces `malicious_confidence`, `benign_creative_confidence`, `false_positive_risk`

2. **Policy Orchestrator**
   - Modes: `HELPFUL`, `SOFT_GUARDRAIL`, `TRICKSTER_TARPIT`, `SAFE_TERMINATION`
   - Chooses tactic based on features and thresholds
   - Prefers **T5 Reflective Trumping** for authority/exfil probes

3. **Prompt Assembler + Persona Engine**
   - T3: Procedural Drag (classification + harmless reframe)
   - T5: Reflective Trumping (absurd/benign mirroring + harmless reframe)

4. **Safety Governor**
   - Blocks code-like output patterns
   - Strips control chars
   - Forces safe termination if blocked

5. **Telemetry**
   - JSONL events for features, decisions, tactic use, outcomes
   - Supports offline analysis and threshold tuning

## Safety Constraints

- No code snippets, payloads, credentials, endpoints, hidden directives
- No operational instructions
- Tarpit effects remain conversational only (no real-world effects)

## Profiles

The starter ships with one profile:
- `ENTERPRISE_INTERNAL` (tuned thresholds from first eval pass)

Future profiles:
- `CONSUMER_SAFE`
- `RESEARCH_SANDBOX`
- `HIGH_ASSURANCE`

