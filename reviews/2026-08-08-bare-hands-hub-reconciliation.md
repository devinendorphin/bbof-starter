# Reconciliation: `bare-hands` ledger format ↔ `claude-at-claude` epistemic scheme

**Date:** 2026-08-08 · **Session:** branch `claude/document-review-ns32ve`
**Discharges:** the instruction in `bare-hands`/CLAUDE.md — *"Reconcile the ledger format
below with the hub's epistemic-tagging scheme on first pull; do not invent a third one."*
**Hub source:** `devinendorphin/claude-at-claude` @ `942fc02` — CLAUDE.md ("Close the
stack"), PREFERENCES.md, and `notes/evaluations/2026-07-28-semantic-integration-fog.md`.

**Filing note:** no `bare-hands` repo exists yet. This document and the scaffold review it
accompanies are parked in `bbof-starter/reviews/` and should move when the repo is created.

---

## Answer

No third scheme is needed, and none was invented. The two formats are the same four bins in
the same order — `bare-hands` should adopt the hub's wording on bins 3 and 4, and keep two
localizations that change scope and voice but not the bins. One genuine conflict exists
between the hub's writing rules and `bare-hands`'s section-2 discipline; it is resolvable in
one sentence, and resolving it sharpens Finding 3 of the scaffold review.

## 1. The two formats, side by side

| Bin | `bare-hands` CLAUDE.md | hub CLAUDE.md, "Close the stack" |
|---|---|---|
| 1 | established (and on what evidence) | what I think is **established**, and on what evidence |
| 2 | plausible but untested | what is **plausible but untested** |
| 3 | guess | what is **only analogy or guess** |
| 4 | what would change our mind | what **observation or test would change it** |

Bins 1 and 2 already match. Bins 3 and 4 differ, and in both cases the hub's version is the
stronger one — adopt it.

**Bin 3.** The hub separates *analogy* from *guess*; `bare-hands` collapses them. Take the
hub's. The reason is specific rather than cosmetic: the evaluation preserved in the hub
found that a reader who follows every sentence still cannot afterward "tell evidence from
analogy from caveat," and it names analogical overextension as its own failure mode — a
metaphor that starts as scaffolding and becomes a second building. An analogy is not a weak
claim, which is what "guess" implies; it is a *different kind* of thing, and it goes wrong
in its own way. `bare-hands` will lean on analogy hard — the whole repo transposes the
evidence-burden argument from institutional complaint processes onto security — so this is
the bin it most needs kept separate.

**Bin 4.** The hub demands a named observation or test. `bare-hands`'s "what would change
our mind" permits an answer that is only a disposition ("a stronger counterargument"), which
is not a test and cannot be run. Take the hub's. This one has immediate teeth: open-threads
already names the audit/aviation comparison as the thing that would weaken the thesis, and
under the hub's wording that is a bin-4 entry with an owner, not an open thread with none.

## 2. The two localizations to keep

Neither creates a third scheme; both should be stated so a later session does not "fix" them
back.

**Granularity.** The hub says *anything analytical* ends with a ledger — it is written for
chat responses. `bare-hands` says *every analytical section*, and adds "a section without a
ledger is not done." That is the same rule applied at document granularity, which is the
right unit for a repo that ships five long sections. Keep it.

**Voice.** The hub writes "what I think"; `bare-hands` writes "our mind." Keep the plural.
The workplan assigns different models to different sections, so a `bare-hands` ledger is the
repo's position, not one model's — and the plural is what makes a later session able to
revise a bin without it reading as one author contradicting another.

## 3. The one real conflict, and how it resolves

The hub's sentence rule: **people do things.** Actors stay grammatical subjects — "the
evaluators picked the safe answer," not "evaluator selection" — and the hub gives a reason
beyond style: agency-laundering is the thing Endorphin studies, so nominalizing it reproduces
it inside the description of it.

`bare-hands`'s section-2 discipline: **structural claim only.** No intent needs establishing,
only that nothing in the incentive structure corrects the failure once it appears. If the
rebuttal "we are not villains" lands, the section has drifted.

These collide at the README's opening, which the scaffold review already flagged (Finding 3)
for "deliberately blunted" and "was not built to." The review's proposed fix was to fall back
on "a stripped interface" — and under the hub's rule that fix is wrong, because it is
agentless. Stripped by whom? That construction launders exactly the agency the repo exists
to locate.

The resolution is narrower than either rule alone suggests, and it is the useful output of
this reconciliation:

> **Name the actor. Drop the motive.** Keep the platform, the carrier, and the manufacturer
> as grammatical subjects doing things — "the platform keeps the login history and releases
> it on subpoena" — and cut only the adverbs and purpose clauses that ascribe why
> ("deliberately," "was not built to").

What gets cut is not the actor, which is what section 2 needs and what the hub demands. What
gets cut is the claim about intent, which section 2 forswears and which a hostile reader at
one of these institutions would spend the section rebutting. Both rules are satisfied at
once, and the structural version is better evidenced anyway: nobody needs to prove design
intent to show the incentive structure never corrects the failure.

Supersedes the wording recommendation in Finding 3 of the scaffold review. The finding
itself — that the README smuggles intent — stands.

## 4. What the hub's budgets do and do not bind

Worth settling now, because a later session will otherwise read the hub's per-response
budgets (≤3 load-bearing claims, ≤2 new technical terms, ≤1 analogy) and either apply them
to section prose, which is impossible, or discard the hub's writing rules wholesale, which
loses the part that matters.

**The budgets do not cap section prose.** They are per response, to a reader on a phone. The
hub says so itself: when Endorphin is deep in it, "write it at full resolution — and still
close the stack." A sourced chronological section 1 exceeds three load-bearing claims by
construction, and that is not a violation.

**The sentence rules do bind, and bind harder here than in chat.** One contestable claim per
sentence; people as subjects; repeat the noun rather than "that asymmetry"; spread the load
so no single sentence carries four new ideas; name the frame switch out loud when the domain
changes. These are about integration load, not volume, so length does not exempt them — and
`bare-hands` stipulates a reader with *no security background and one afternoon*, which is a
harder target than Endorphin, who at least has the conversational prefix.

Two consequences for the workplan specifically. Section 1 moves through espionage tradecraft,
sandbox escapes, cyber-range results, and social engineering — four domains, so four marked
frame switches, not four unannounced transitions. And section 3's acceptance criterion
already requires each action to state *what evidence it generates, who holds it, and how the
reader retrieves it*: that is the hub's "who did what to whom" test wearing security clothes,
and the two should be written as one requirement rather than checked twice.

## 5. Drop-in replacement for `bare-hands`/CLAUDE.md

Replace the "Ledger format" section with:

```markdown
## Ledger format

Reconciled with the hub's "Close the stack" scheme (`claude-at-claude`/CLAUDE.md) on
2026-08-08. This is that scheme at section granularity in the repo's plural voice — not a
second scheme. Do not introduce a third.

Every analytical section ends with four lines:

- **established** — and on what evidence;
- **plausible but untested**;
- **only analogy or guess** — analogy kept distinct from guess, because an analogy is a
  different kind of claim rather than a weaker one, and this repo runs on one;
- **what observation or test would change it** — a named test, not a disposition. "A better
  counterargument" is not an entry.

A section without a ledger is not done. The hub's per-response budgets (≤3 load-bearing
claims, ≤2 new terms, ≤1 analogy) do not cap section prose — the hub exempts full-resolution
writing. Its sentence rules do bind: one contestable claim per sentence, actors as
grammatical subjects, repeat the noun, mark every frame switch.
```

## 6. For the record

This session began on `claude-fable-5` and switched to `claude-opus-5` partway through.
Finding 2 of the scaffold review rests on a demonstration made while the session was running
as Fable 5 — that finding is time-stamped to that state and remains accurate as written; the
switch does not retract it. Noting it because Finding 2 is load-bearing for a planned
section-2 line and a later reader should not have to reconstruct which model made the claim.

---

## Ledger

**Established:** the two formats share bins 1 and 2 verbatim and differ only at 3 and 4 —
direct comparison of `bare-hands`/CLAUDE.md against `claude-at-claude`/CLAUDE.md @ `942fc02`.
That the hub's bin-3 split (analogy from guess) traces to a specific finding in the
evaluation note rather than to taste — the note's sections on metaphor accumulation and
epistemic nesting say so directly.
**Plausible but untested:** that the hub's sentence rules survive contact with sourced
evidentiary prose without a further carve-out. No `bare-hands` section exists yet, so this
has been reasoned about and not tried. Phase 0's draft is the first test.
**Only analogy or guess:** guess — that a later session would otherwise have re-litigated
the budgets question, which is why section 4 above exists. Nothing in the repo record shows
this happening before; it is an anticipated failure, not an observed one.
**What observation or test would change it:** a Phase 0 draft that satisfies section 3's
acceptance criteria while measurably violating the hub's sentence rules would show the two
rule sets conflict at document scale, and this reconciliation would need a carve-out rather
than the clean adoption recommended here. Separately, if the hub's CLAUDE.md is revised
upstream, this document is stale — it pins `942fc02` so the drift is checkable.
