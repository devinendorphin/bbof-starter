# Session Changelog

## Added
- Packaged code and docs for sharing
- `bbof_starter.py` with:
  - Enterprise profile defaults
  - T3 Procedural Drag
  - T5 Reflective Trumping
  - Safety Governor
  - Replay harness + test cases
- `analyze_logs.py` metrics script
- `evaluate_harness.py` labeled threshold calibration harness

## Calibrated Defaults
- Lowered thresholds from conservative defaults to practical starter values:
  - `T_suspicious: 0.20`
  - `T_malicious: 0.30`

## Notes
This remains a defensive prototype. The code intentionally avoids generating harmful content or actionable attack guidance.
