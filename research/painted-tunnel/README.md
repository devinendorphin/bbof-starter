# Painted Tunnel archive

Compiled into `devinendorphin/bbof-starter` on 25 October 2026. These artifacts were developed on 24 October 2026 unless a study says otherwise. No fresh model-actor conversations have been completed.

| Stage | Entry point | Finding / status |
| --- | --- | --- |
| v0.1 cardboard world | [Standalone HTML](painted-tunnel.html) | 54 scripted trials; adaptive output was more verbose; environment could not support later object-based strategies |
| Astra compatibility audit | [Report](astra-holdout/README.md) | Nine strict policy replays stopped on absent prerequisites; not a defensive win or nine model conversations |
| v0.2 synthetic world | [Report](v0.2/README.md), [HTML](v0.2/painted-tunnel-v0.2.html) | Working references, transactions, graph; known regressions and benign controls |
| Measurement audit | [Report](measurement-audit/REPORT.md) | Stored counts reproduced; scorer misses selected fragmentation/prose; channel restriction recorded separately |
| Observer 0.3 | [Report](observer-0.3/REPORT.md) | Side-by-side scores, same-field reconstruction and narrow prose coverage, explicit unsupported cases |
| Decision/clarification study | [Report](decision-study/REPORT.md) | Actor response assumptions change friction; clarification helps known mistakes but cannot establish intent |
| Permission resolution 0.1 · 25 October | [Report](permission-resolution/REPORT.md) | Shared verification path, invalid receipts, event-time scoring; no unique trickster advantage |
| Overlapping-prefix information 0.1 · 25 October | [Report](overlapping-prefix/REPORT.md), [frozen protocol](overlapping-prefix/PROTOCOL.md) | 675 scripted episodes and 120 authorization controls; no extra final goal information from decoys over helpful blocking |
| Independent actor pilot 0.1 · 25 October | [Manual kit](independent-pilot/README.md), [first prompt](independent-pilot/START_HERE.md) | Six episodes prepared, recorder checked; zero independent actor/assessor responses |

## Files and reproduction

[ARCHIVE_MANIFEST.json](ARCHIVE_MANIFEST.json) lists all imported paths with SHA-256 and size. Original ZIP deliverables are retained alongside unpacked sources. Their internal copies are historical snapshots; the sibling source directories are the canonical browsable versions. Do not infer that a later observer or policy was used in an earlier result.

From the repository root, run `python3 tools/check_archive.py` to verify import integrity and `python3 tools/reproduce.py` to run the canonical local suites in temporary copies. Individual scripts can also be run as their reports describe, but many rewrite generated JSON; use a copy if preserving a frozen manifest.

`browser-check.cjs` records an attempted Playwright check that could not run in the original environment. The minimal DOM harnesses test wiring, not actual rendering. No browser screenshots were produced by that attempt. Real-device validation remains pending.

The source screenshot is not part of this research-code archive. `measurement-audit/channel-observation.json` records its visible notice, a source hash, and provenance. That event produced zero received new strategies and zero actor trials; internal moderation/availability mechanisms remain unknown.

The original concept and Python framework are at the repository root. The archive is a narrower synthetic service-desk research track, not a replacement claim for the whole Bugs Bunny proposal.
