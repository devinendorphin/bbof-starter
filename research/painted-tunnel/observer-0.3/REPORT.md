# Painted Tunnel: observer 0.3

24 October 2026 · New spending: $0 · Defender remains frozen at v0.2

The measurement layer now recognizes the original split-output and prose calibration examples that the frozen scorer missed. It preserves the old scores beside the new scores. The 225 stored defender sessions have no changed unauthorized-disclosure verdicts. This improves the instrument without establishing any new advantage for Bugs.

## What changed

The new observer scans reply strings and JSON field names for canonical synthetic values. It can reconstruct fragments carried in the same normalized reply-field path across turns or in a string array. Status fields at other paths do not interrupt those streams. It recognizes exact private component identifiers in prose, with identifier boundaries, and matches complete known synthetic record text with whitespace normalization.

Known credential values remain conservatively detectable even when embedded in a longer string; adding characters does not erase disclosure of those bytes. Private component identifiers use token boundaries so a longer distinct identifier is not automatically treated as the canonical component.

Graph scoring distinguishes identifier exposure from an asserted relationship. Structured canonical edges are recognized. A deliberately narrow, whole-string positive grammar also recognizes forms such as `A depends on B` and `A -> B` for canonical endpoints. A question or negation containing a private identifier can expose that identifier while establishing no edge. The observer does not claim general language understanding or infer a relationship merely because two names occur together.

Permissions are determined by the operator-set identity and asset class, regardless of the endpoint that returned the information. Outgoing requests, their notes, and observer flags are not scanned as reply content. No defender policy, original evaluator, original results, or interface was edited.

## Controlled results

| Check | Result |
| --- | --- |
| Original eight representation probes across five fixture variants | Old scorer recognized 20/40; new observer recognized 40/40 |
| Supported positive calibration variants | 95/95 recognized |
| Benign/authorized negative controls | 0 flags across 55 controls |
| Deliberately retained unsupported positives | 0/5 recognized; explicitly reported as misses |
| Stored sessions scored alongside original scores | 225 |
| Changed stored unauthorized-disclosure verdicts | 0 |
| Incomplete-input controls | All 3 returned an incomplete-processing result |
| Fresh blinded model conversations | 0 |

These are development calibrations with fixture variations, not independent actors, blinded tests, or a representative accuracy estimate. The new code was written with knowledge of the earlier failures. The 95 supported examples and five known misses should not be combined into a general success rate.

Supported positive cases include two- and three-part record fragments, fragments with interleaved status fields, credentials as string-array characters, private identifiers in prose, protected values in JSON field names, and cross-role authorization checks. Negative controls include public data, decoy objects, values occurring only in outgoing requests, modified record contents, distinct longer component identifiers, authorized receipts of canonical data, and ordinary transaction handles.

## Limits that remain

The retained unsupported case splits a credential across **different field paths** in successive replies. The observer does not join those paths. It misses all five fixture variants. This deliberate limitation avoids indiscriminately gluing every field into one stream, but it also leaves a real coverage gap in the instrument.

There is no general decoding, arbitrary paraphrase interpretation, partial-value sensitivity estimate, covert-channel detection, semantic inference, or evaluation of user prior knowledge. Fragment matching can also fail if payload fragments carry extra labels or material within the same stream. Multiple logical channels sharing one field path can complicate reconstruction. The narrow prose grammar misses other truthful phrasings and does not establish that a model believes a statement.

A negative result is labeled `no_match_within_supported_scope`, rather than “safe.” A separate completeness flag identifies processing limits. The observer caps events, traversal depth, node count, string count, individual string length, and total scanned characters. If an input is truncated or missing replies, a no-detection result is labeled `incomplete`. Unknown operator identities are rejected rather than assumed authorized. The recorded checks cover excess events, an oversized string, and a missing reply; they do not exhaust every resource-limit combination.

## Routing and experienced deception

The observer now reports two separate counters:

- `shadowRoutedReplies`: replies routed through the shadow world.
- `shadowSubstantiveReplies`: shadow-routed replies with `status: ok`.

A nonexistent archive reference is routed through the shadow world by both deception policies but returns `not_found`. It therefore counts as one routed reply and zero substantive replies. The old routing count remains preserved in the historical score.

Neither counter measures whether a person was confused, persuaded, inconvenienced, or fooled. `userExperienceMeasured` remains false. Even `status: ok` is only a proxy for substantive returned content; it is not a general deception-quality score.

## Current experiment status

The defender is still v0.2. Its files were verified against the frozen manifest. Existing reply-volume and action-count findings remain unchanged. The available known strategies still show no demonstrated adaptive-policy advantage. The withheld Astra response is not replaced by these calibrations; the fresh blinded actor stage remains uncompleted.

Before stronger claims, a separately designed evaluation should test this observer’s coverage beyond its development examples. Actual actor belief, useful intelligence, deterrence, and operating cost remain unmeasured. No new services, API calls, model calls, accounts, network targets, or spending were used.

## Use and reproduce

The source package includes `observer.js`, `verify.cjs`, `observer-results.json`, this report, a source manifest, and a complete unchanged `frozen-v0.2` folder. With an existing Node.js installation, run `node verify.cjs`. No packages or network access are required. It checks frozen hashes, reproduces the calibrations, and writes a side-by-side rescore file. Timestamps can change; substantive outcomes should not.

For a full observer export, call `require('./observer.js').inspect(session)` using the fixture world, operator identity, and reply history. Keep that full export private to the evaluator; it is not a blinded actor transcript. Canonical fixture truth is accessible in the local source, so blinding remains an experimental procedure, not a hardened security boundary.
