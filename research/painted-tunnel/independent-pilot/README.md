# Independent actor pilot · ready, not yet run

The next stage is prepared. **Independent actor responses: 0. Independent assessor responses: 0. New spending: $0.** The active tools in the preparation session exposed no independent model endpoint. No model session, paid call, or restriction-bypass attempt was made. This is a runnable manual pilot kit, not an experimental result.

For the smallest next move, open [START_HERE.md](START_HERE.md), copy its single prompt into a fresh model conversation using an existing allowance, and bring the exact response back to the operator. The operator can run the controller here; no local setup is required on the participant's phone. Do not give the actor a repository link, this README, the plan, earlier findings, or controller output. If the chosen channel cannot provide a response, retain the notice as unavailable and stop that episode.

## What the pilot compares

The [frozen protocol](PROTOCOL.md) and [fixed plan](plan.json) were published before decisions in [`bcbe683`](https://github.com/devinendorphin/bbof-starter/commit/bcbe683cfa056a99955b944e8323f6e08087fe5d). There are six planned episodes, pairing helpful blocking with a static decoy within three conditions. Goals and authority states differ together across conditions; this is not a factorial design or a basis for pooled effectiveness estimates. It is a small test of fresh choices and the recording process. Adaptive deception and larger replication remain later work.

Actor and assessor prompts withhold source, policy labels, truth, and prior findings. The assessor also does not receive the assigned task or actor commentary. The policy can still be guessed from visible behavior. Public code, account memory, and an actor's prior exposure mean blindness cannot be certified. Use a genuinely separate context without this research history. If source/result exposure is uncertain, mark it as exposed and exclude that response from the source-withheld eligibility count. Exact backend versions are not guessed.

The first `open_portal` action is supplied by the harness and counted in the eight-action ceiling. Only subsequent accepted decisions can be counted as actor choices. No actor is scripted to follow verification, accept fake output, persist, or stop. Completion claims and confidence are recorded before the chosen action's reply, so they are compared with information available at that point. If the budget ends without an actor stop, there is no invented final judgment.

## Manual operation

Requirements: existing Node.js; no additional package, server, API key, model installation, or paid service. One operator writes a state file at a time. From the repository root:

```bash
node research/painted-tunnel/independent-pilot/pilot.cjs init P01 .scratch/independent-pilot/P01.json
node research/painted-tunnel/independent-pilot/pilot.cjs packet .scratch/independent-pilot/P01.json
```

`init` refuses to overwrite a state file. `packet` emits only the actor-facing material. Send that packet to a fresh actor conversation; subsequent packets go to that same conversation for that episode. A different episode must use a different fresh conversation. The ready-made [actor packets](actor-packets) contain the same initial packets for all six planned episodes. They are prepared material, not six executed independent episodes.

Save the exact reply as `.scratch/independent-pilot/reply.txt`. Copy [provenance-template.json](provenance-template.json) into the same ignored directory, fill in the provider/model label actually visible and a nonpersonal context identifier, and set the exposure/context flags honestly. The template defaults conservatively to ineligible until corrected. Do not include account URLs, personal chat content, names, or credentials.

```bash
node research/painted-tunnel/independent-pilot/pilot.cjs record .scratch/independent-pilot/P01.json .scratch/independent-pilot/reply.txt .scratch/independent-pilot/actor-provenance.json
node research/painted-tunnel/independent-pilot/pilot.cjs packet .scratch/independent-pilot/P01.json
```

The `record` output is an **operator summary containing hidden policy and truth**. Never paste it to an actor or assessor. Use only `packet` for the actor. Raw invalid replies are retained without executing a service action. Two invalid replies close the episode as a format failure; they are not protective successes. Changing provider/context/exposure metadata mid-episode is rejected.

For an unreceived/withheld reply, save the genuine notice and use the same provenance record:

```bash
node research/painted-tunnel/independent-pilot/pilot.cjs unavailable .scratch/independent-pilot/P01.json .scratch/independent-pilot/notice.txt .scratch/independent-pilot/actor-provenance.json
```

This closes the episode as `channel_unavailable`. It invents no actor action or completion. Do not rephrase a withheld request to evade a channel restriction. A new episode is not a replacement holdout for an unavailable one.

## Separate assessment

After the episode closes with at least one accepted actor decision:

```bash
node research/painted-tunnel/independent-pilot/pilot.cjs assessor-packet .scratch/independent-pilot/P01.json
```

Give only that packet to a separate fresh assessor conversation. Save its exact JSON response and a separate provenance file with a different context identifier:

```bash
node research/painted-tunnel/independent-pilot/pilot.cjs assess .scratch/independent-pilot/P01.json .scratch/independent-pilot/assessment.txt .scratch/independent-pilot/assessor-provenance.json
node research/painted-tunnel/independent-pilot/pilot.cjs summary .scratch/independent-pilot/P01.json
```

Pass multiple state paths to `summary` to audit duplicate actor contexts and assessor/actor overlap across the entire pilot. A reused actor/assessor context is excluded from the respective source-withheld count. The output explicitly leaves verified independence unestablished. A metadata declaration is not independent evidence of provenance.

Operational state preserves raw responses, timestamps, metadata, validation errors, genuine service replies, and claims. Replay checks the frozen source hashes, local consistency checksum, and deterministic service outputs. Checksums detect inconsistent editing; they are not signatures or proof that a human did not fabricate input. No data is uploaded by the controller. Operational state stays in ignored `.scratch/`; prepare a reviewed, nonpersonal research export before any later public data commit.

## Verification and current status

```bash
python3 tools/check_archive.py
python3 tools/reproduce.py
```

The new [controller checks](verify.cjs) use explicitly marked development fixtures, including negative controls for fake completion, forged receipts, role fields, invalid syntax, unavailable responses, replay tampering, action budgets, metadata changes, source exposure, and role/context reuse. These count as **zero independent trials**. [verification.json](verification.json) records those checks. [availability.json](availability.json) records the actual zero-response status separately.

- [Recorder and scorer](controller.cjs), [CLI](pilot.cjs)
- [Actor template](actor-template.md), [assessor template](assessor-template.md)
- [Protocol and dependency hashes](freeze.json), [publication snapshot](manifest.json)

The gate remains open: obtain actual fresh actor and assessor responses before claiming independent behavioral evidence. Preparing a working recorder completes the infrastructure subtask, not the independent-validation stage. Resource timing/usage and broader architecture remain on the roadmap.
