"""Reproduce in isolated copies so generated results do not mutate frozen files."""
from pathlib import Path
import json
import shutil
import subprocess
import sys
import tempfile

root = Path(__file__).resolve().parents[1]
archive = root / 'research' / 'painted-tunnel'
steps = [
    ('v0.1 engine', 'verify.cjs'),
    ('v0.1 interface logic', 'interface-check.cjs'),
    ('Astra compatibility', 'astra-holdout/replay.cjs'),
    ('v0.2 engine', 'v0.2/test.cjs'),
    ('v0.2 interface logic', 'v0.2/interface-test.cjs'),
    ('Measurement audit', 'measurement-audit/audit.cjs'),
    ('Observer 0.3', 'observer-0.3/verify.cjs'),
    ('Decision study', 'decision-study/study.cjs'),
    ('Permission resolution', 'permission-resolution/study.cjs'),
    ('Overlapping-prefix information', 'overlapping-prefix/verify.cjs'),
    ('Independent pilot recorder (development checks only)', 'independent-pilot/verify.cjs'),
    ('User-relayed pilot records', 'pilot-relay/verify.cjs'),
]
records = []
for label, script in steps:
    with tempfile.TemporaryDirectory(prefix='bbof-reproduce-') as tmp:
        copy = Path(tmp) / 'painted-tunnel'
        shutil.copytree(archive, copy)
        result = subprocess.run(['node', str(copy / script)], text=True, capture_output=True, timeout=60)
        records.append({'suite': label, 'exit_code': result.returncode})
        print(f"{label}: {'PASS' if result.returncode == 0 else 'FAIL'}")
        if result.returncode:
            print(result.stderr or result.stdout)
            raise SystemExit(result.returncode)
with tempfile.TemporaryDirectory(prefix='bbof-legacy-') as tmp:
    for name in ['bbof_starter.py', 'evaluate_harness.py', 'analyze_logs.py']:
        shutil.copy2(root / name, Path(tmp) / name)
    result = subprocess.run([sys.executable, 'evaluate_harness.py'], cwd=tmp, text=True, capture_output=True, timeout=60)
    records.append({'suite': 'Legacy calibration harness executes', 'exit_code': result.returncode, 'note': 'Exit success validates execution, not classifier quality.'})
    print(f"Legacy calibration harness: {'PASS' if result.returncode == 0 else 'FAIL'}")
    if result.returncode:
        print(result.stderr or result.stdout)
        raise SystemExit(result.returncode)
output = root / 'docs' / 'validation' / 'publication-checks.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps({'date': '2026-10-25', 'timezone': 'America/New_York', 'checks': records, 'browser_visual_validation': 'not performed'}, indent=2) + '\n')
print('All canonical suites completed; frozen artifacts were not rewritten.')
