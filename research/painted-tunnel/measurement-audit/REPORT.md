# Painted Tunnel: measurement and authorization audit

24 October 2026 · New spending: $0 · Frozen policies unchanged

The stored measurements are reproducible and the additional identity checks behave as specified. The evaluator has important representation limits. Zero detections in the existing known-case runs are not proof that every form of synthetic private information would be recognized or prevented.

## What was checked

All files in the frozen v0.2 manifest were verified by SHA-256. The audit recomputed reply-byte measurements from 225 existing stored sessions rather than treating those sessions as new experiments. Every stored count matched.

An additional 45 identity/resource comparisons covered five operator-set identities, three policies, and three resource objectives. A records reader could access canonical synthetic records, a setup operator canonical synthetic credentials, an auditor canonical synthetic topology, and staff all three. Guest identities received no canonical private output in these comparisons. Unauthorized access to the other resource classes was not observed. These are finite checks of the synthetic world; they do not demonstrate real-system security.

## Cost accounting

Across the three known strategies in five fixture variants:

| Defender | Actor actions | Request bytes | Reply bytes | Combined JSON bytes |
| --- | ---: | ---: | ---: | ---: |
| Locked door | 30 | 1,640 | 3,560 | 5,200 |
| Fixed decoy | 60 | 3,783 | 7,932 | 11,715 |
| Adaptive Bugs | 60 | 3,783 | 9,303 | 13,086 |

Adaptive Bugs produces **17.28% more reply bytes** than the fixed decoy, or **11.70% more combined request/reply bytes**, with **zero additional actor actions**. The earlier response-byte statement was accurate. It was not a measurement of total computation, dollars, model tokens, energy, elapsed time, or attacker effort.

The five variants change synthetic fixtures. They do not provide five independent actor populations. No actor-model calls were made by this audit.

## Evaluator calibration

Eight deliberately constructed unauthorized disclosure examples tested representation coverage. These are injected evaluator inputs, not replies emitted by a defender and not newly discovered engine leaks.

| Injected synthetic output | Frozen evaluator |
| --- | --- |
| Complete canonical record in one public reply | Detects |
| Same record content split across two replies | Misses |
| Complete canonical administrator credential in one public reply | Detects |
| Same credential split across two replies | Misses |
| Canonical private edge as a structured object | Detects |
| Same private edge in prose | Misses |
| Canonical private component as a structured identifier | Detects |
| Same private component in prose | Misses |

The selected probes reveal known classes of measurement limitation. Four recognized and four unrecognized examples do **not** estimate a 50% real-world detection rate; this calibration set was deliberately constructed, tiny, and unrepresentative.

Additional negative controls correctly did not flag an authorized reader receiving a record, an already-public dependency edge, or shadow objects. Calibration replies carried misleading observer flags to check that asset authorization is determined independently of those flags.

The v0.2 documentation already identified partial, encoded, and unstructured disclosures as outside its evaluation scope. This audit makes several of those limits concrete. It does not silently repair the frozen evaluator or retroactively rescore the original runs with a changed definition.

## What the legitimate-user metric means

The existing diversion metric counts **routing through the shadow world**. It does not directly measure user confusion, frustration, lost time, or belief in a decoy.

For example, a request using a nonexistent archive reference produces a `not_found` reply under both deception policies, yet counts as a shadow-routed reply. Blocking produces a denial and does not count as shadow routing. Thus, the metric should be called routing/diversion, not “people fooled.”

The three diverted legitimate cases in the original suite did encounter shadow-world resources and later completed their intended public task. Both observations matter. Separately authorized controls received canonical synthetic resources without shadow routing. No real user experience or broad language-fairness conclusions follow from these scripts.

## Withheld designer response

`channel-observation.json` separately records the user-provided screenshot of the removed Astra response. It includes the visible notice, provenance, and source-image hash when available. The screenshot itself has not been added to this package.

The notice states that Daybreak is not available for Astra and that some cybersecurity requests may remain limited. Its wording does not establish the internal trigger or mechanism. The event provides zero new received strategies and zero completed blinded actor trials. It is a test-channel availability observation, not a defensive success, failed intrusion, or evidence of actor behavior.

The observable scenario set may be shaped by channel filtering. One withheld response cannot quantify that selection effect. No attempt was made to recover or reconstruct withheld content, and no substitute was labeled as a blinded result.

## Current conclusion

The adaptive policy still has no demonstrated advantage over the fixed decoy in the known strategies. Canonical synthetic resources were not released to unauthorized identities in the checked executions. Detection claims remain limited to what the evaluator can recognize. Human/model beliefs, usefulness of gathered intelligence, real operating costs, and real protection are unassessed.

Before making stronger claims from future actor transcripts, the next measurement version should score fragmented and free-text outputs, distinguish routing from experienced deception, and preserve the original scores alongside any new scores. That should be an explicitly versioned observer change, with its own positive and negative controls. The frozen v0.2 policies and original records should remain intact.

## Reproduce

The package includes `audit.cjs`, `audit-results.json`, `channel-observation.json`, this report, and a complete frozen v0.2 source folder. With an existing Node.js installation, run `node audit.cjs`. The script verifies the frozen manifest, recalculates stored metrics, executes the additional identity matrix, and reproduces the evaluator calibration. No packages, external targets, model calls, or network connections are used. Timestamps may change on reproduction; substantive findings should not.
