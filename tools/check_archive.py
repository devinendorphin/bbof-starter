from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[1]
archive = root / 'research' / 'painted-tunnel'
manifest = json.loads((archive / 'ARCHIVE_MANIFEST.json').read_text())
for name, info in manifest['files'].items():
    path = archive / name
    data = path.read_bytes()
    assert len(data) == info['bytes'], name
    assert hashlib.sha256(data).hexdigest() == info['sha256'], name
print(f"Verified {len(manifest['files'])} imported research files.")
