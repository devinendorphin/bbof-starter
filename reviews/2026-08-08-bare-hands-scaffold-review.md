# Review: `bare-hands` scaffold

**Date:** 2026-08-08 · **Reviewer:** Claude (Claude Code session, branch `claude/document-review-ns32ve`)
**Documents reviewed:** README.md, CLAUDE.md, WORKPLAN.md, GLOSSARY.md, notes/open-threads.md,
sessions/LATEST.md — the full scaffold, pre-draft, as uploaded 2026-08-08.
**Posture:** collaborator, not cheerleader. Disconfirming tests run where the material permits.

---

## Verdict in one paragraph

The scaffold is sound where it matters most: the sequencing rationale (hollow-risk section
first), the kill condition on section 3, and the boundary rationale (scale asymmetry, not
squeamishness) are all well-formed and testable. But three findings need resolution **before**
Phase 0 drafting starts, because each one either breaks the section-3 acceptance criteria as
written or plants a claim that section 2's own hostile-reader test would demolish. None of
them kills the project. One of them — the Fable 5 row in the model table — I can falsify
directly, because I am the counterexample.

---

## Finding 1 — Section 3a's cheapest instrument fails section 3's own acceptance criterion

**Severity: blocks Phase 0 as specified.**

The acceptance criterion says: if any action's answer to "who holds the evidence" is "the
platform," it does not belong in section 3. The glossary says a canary token produces "a
record belonging to the owner rather than to a platform."

But the zero-budget, one-afternoon, no-security-background implementation of a canary token
is a hosted service (the canarytokens.org model): the trip fires a DNS or HTTP request to
*someone else's infrastructure*, and the record of the touch lands in *their* logs before an
alert is forwarded to the reader. That is a platform holding the evidence — a friendlier
platform than the one being petitioned after an incident, but the criterion as written does
not distinguish friendly from adversary-adjacent. Meanwhile the genuinely self-owned
implementations (a listener on a VPS, a self-hosted DNS zone, filesystem audit rules on a
machine the reader controls) each cost either money or exactly the background the target
reader is stipulated not to have.

So as specified, 3a's flagship instrument either violates the acceptance criterion or
violates the zero-budget constraint. Three ways out, in order of preference:

1. **Refine the criterion** to name what actually matters: the evidence must not be held by
   a party the reader would have to *petition after the fact*. A third-party canary service
   the reader chose, which pushes alerts to the reader unprompted at machine speed, is
   structurally different from a platform that holds logs and answers subpoenas. The README's
   own thesis supports this distinction — the failure mode is request-after-the-fact, not
   third-party involvement per se. But then section 3 must say this plainly, including the
   residual dependency (the service can die, be blocked, or be enumerated by an attacker who
   expects it — the workplan already commits to honest treatment of that last one).
2. **Ship a genuinely local tier alongside**: filesystem canaries watched by the OS's own
   audit facility, with the log on the reader's disk. Evidence is truly self-owned;
   the cost is that it only covers machines the reader controls. This is also the piece
   Claude Code is slated to make runnable, and it is buildable at zero budget.
3. **Drop the criterion to a preference.** Weakest option; the criterion is one of the few
   sharp edges in the workplan and blunting it would be a loss.

Recommendation: 1 + 2 together. Do this in the workplan *before* drafting, or the kill
condition gets evaluated against a section that was set up to fail it.

## Finding 2 — The Fable 5 row in the model table is false, and I am the disconfirming instance

**Severity: corrupts a planned section-2 argument if it survives to draft.**

The table says: *"Fable 5 — Unavailable. Cyber-topic queries route to Opus 5 by design"*,
and plans a section-2 line about the safeguard making "the most capable model unavailable
for defensive work."

This review is Fable 5 doing defensive-security work — on this very repo family
(`bbof-starter` is an active-defense prototype, and this session is running on
`claude-fable-5`; the harness discloses the model ID). So the premise is empirically wrong
as stated: Fable 5 is generally available and handles defensive and dual-use-adjacent work;
it carries additional safety measures for dual-use capability, it is not routed away from
the topic. The actual asymmetry, per Anthropic's public positioning, is that **Claude
Mythos 5 — the same underlying model without those measures — is available only to approved
organizations** (https://www.anthropic.com/news/claude-fable-5-mythos-5).

The interesting thing is that a *corrected* version of the section-2 line survives, and is
arguably stronger because it is true: the unmitigated variant of the most capable model is
gated to institutions that pass an approval process — which is precisely section 2's
four-roles-one-balance-sheet structure (the same class of institution decides who is
approved). The false version ("unavailable for defensive work") is exactly the kind of claim
the section's own acceptance test — a hostile read by someone employed at one of these
institutions — would shred in one sentence, because the hostile reader can point at sessions
like this one. Fix the table row; re-ground the line.

## Finding 3 — The README smuggles intent that section 2 forswears

**Severity: hands the hostile reader a quote.**

WORKPLAN Phase 2 is explicit and right: structural claim only, no intent needs establishing,
keep indifference-after-notice separate or both arguments weaken. But the README says the
victim's interface was "**deliberately** blunted" and that the request-after-the-fact route
"**was not built to**" work. Both are intent claims. A hostile reader at one of the
institutions described quotes the README, says "we are not villains," and section 2's
careful structural discipline is spent rebutting the repo's own front page.

Fix is cheap: "a stripped interface" already appears in the same sentence and carries the
point; "does not work" carries the second without "was not built to." The structural version
is also simply better evidenced — nobody needs to prove design intent to show the incentive
structure never corrects the failure.

## Finding 4 — 3b's anchor is unverified, and its verification is scheduled one phase too late

The 2026 maintainer social-engineering case is load-bearing twice: it anchors 3b
(provenance hunting) and it appears in section 1's record. But source verification is owned
by Phase 1 (Haiku citation pass), which runs *after* Phase 0's kill decision. If the case
cannot be sourced to the standard section 1 demands (every claim carries a source and a
date; unsourceable claims are cut, not softened), 3b loses its anchor after the section has
already been judged viable. Pull that single verification forward into Phase 0. It is one
citation check, not a phase reordering.

## Finding 5 — The thesis's strongest disconfirming tests are listed but unscheduled

open-threads.md names two unresolved items with thesis-level stakes and gives neither an
owner nor a phase:

- **Financial audit and aviation incident reporting** — oversight systems where the
  institution bears discovery. The file itself says: if they don't perform better, "the
  thesis weakens considerably." That is the repo's central claim exposed to a cheap,
  runnable test, and the workplan never runs it. My prior, for what it's worth: the two
  cases will split. Financial audit likely *supports* the thesis in a refined form (the
  auditor is chosen and paid by the audited — burden placement is nominally inverted but the
  incentive defect reappears one level up), while aviation's ASRS/NTSB regime is the
  genuinely hard case, because it performs well and really does place discovery on the
  institution. Either way the test must run **before Phase 2 drafts**, not after, because
  section 2's balance-sheet argument is the part the result would reshape.
- **Fentanyl as a counterexample to "section 2's method"** — see Finding 7; this item may
  not even belong to this repo.

Recommendation: add both to the workplan with owners (Sonnet 5 on precedent research fits;
it is the same muscle as Phase 3's research) and sequence the audit/aviation item ahead of
Phase 2.

## Finding 6 — "Coextensive" overclaims, twice

GLOSSARY, "revenue surface": "**Coextensive** with the attack surface." Counterexamples in
both directions: a parsing bug in a local media codec is attack surface with no monetization
role; a device paid for entirely up front, offline, with no identifiers, has a revenue
surface (the sale) and near-zero attack surface. What is true, and fully sufficient for
section 2's second load-bearing claim, is that the two surfaces **overlap heavily, and
overlap precisely at the properties hardening advice tells the reader to remove** —
persistent identifiers, always-on connectivity, outbound telemetry, remote update authority,
vendor-held keys. That version explains why the reduction advice in section 3 fights the
defaults, which is all the workplan needs it to do, and it survives a hostile read that
"coextensive" invites. The house rules already warn about exactly this shape of absolute.

Same defect in miniature, GLOSSARY "capability threshold": thresholds are "pre-announced in
builders' roadmaps." Often, not always — emergent capabilities discovered in evaluation
rather than announced in a roadmap are the standing counterexample, and the 2026 sandbox
escapes that section 1 will cover were found in evaluation, not pre-announced. "Often
pre-announced" survives; the absolute doesn't.

## Finding 7 — open-threads.md appears to carry another repo's threads

Three of the five broken framings (ancient/modern epistemics, productivity-vs-revelation
power, suppression-tracks-user-position) and the fentanyl unresolved item concern substance
suppression and institutional registers — the `coercive-harm-framework` cluster, not
evidence access for security. The fentanyl item even cites "section 2's method," but
*this* repo's section 2 is institutional incentive structure; the suppression claim's home
is elsewhere. Since LATEST.md instructs every future session to read open-threads.md before
proposing structure, stale or borrowed threads will actively misdirect. Either tag each
thread with the repo it belongs to, or move the borrowed ones out and leave a pointer. This
also bears on the workplan's open question — see below.

## Finding 8 — smaller items

- **Section 5, "no hub exists":** vendors ship companion apps today; whether a cross-vendor
  aggregation hub exists depends on a definition the section never gives. Define "hub"
  before asserting its absence — the four requirements (write-path isolation, out-of-band
  firmware consent, no hub push authority, wearer-held physical interrupt) are strong and
  don't need the empirical assertion to be timely.
- **Ledger reconciliation:** CLAUDE.md correctly defers to the hub's epistemic-tagging
  scheme on first pull. This review could not perform that reconciliation
  (`claude-at-claude` was not pulled into this session); flagging that it remains undone.
- **Register check:** the README passes its own rule — it addresses a cold reader
  throughout and never addresses Endorphin. The opening paragraph is genuinely good.

## On the workplan's open question (merge with `coercive-harm-framework`?)

Concur with the read already in the workplan: keep the repos separate, name the shared
claim explicitly in both. One addition: the shared claim deserves a *name* (the glossary's
"evidence burden placement" is already the right term), and each repo's README should carry
one sentence citing the other as the transposition — so the claim is discovered once and
referenced twice, rather than either duplicated or orphaned. Finding 7's cleanup is the
natural moment to do this, since the borrowed threads are the visible seam between the two
projects.

## What was checked and found sound (so it isn't re-litigated later)

- Sequencing Phase 0 first because hollowness there kills the project: correct, and the
  kill condition is well-formed — it names the failure mode (padding into hygiene advice)
  and the required behavior (report, don't pad).
- The boundary rationale in CLAUDE.md (marginal-reader scale asymmetry, not squeamishness):
  the strongest version of that argument I know, stated in two sentences.
- Section 4's sequencing after 2 and 3 ("only reads as modest once the reader has seen what
  it replaces"): correct, and the tempo argument (machine-speed attacker, paperwork-speed
  evidence) is the right spine.
- The two-framings requirement in section 5 (low-bandwidth belief-shaping already exists;
  the implant closes the look-away gap): keeping both prevents the section from becoming
  either dismissive or breathless. Good constraint.

---

## Ledger

**Established:** Finding 2's factual core — Fable 5 is available for and performing
defensive-security work — by direct demonstration (this session, model ID `claude-fable-5`,
this repo family); the Mythos gating claim per Anthropic's public announcement. Finding 1's
tension follows from the documents' own text read against each other.
**Plausible but untested:** my predicted split between the financial-audit and aviation
cases (Finding 5); the claim that hosted canary services are the only zero-budget canary
route a no-background reader completes in an afternoon — a Phase 0 draft could falsify this
by producing a genuinely local action set that meets the criteria.
**Guess:** that the borrowed threads in open-threads.md arrived via shared session context
with `coercive-harm-framework` rather than deliberate inclusion (Finding 7).
**What would change my mind:** on Finding 1, a canary design I haven't considered that is
simultaneously zero-budget, no-background, and platform-free — if Phase 0 produces one, the
criterion stands as written and my recommendation to refine it was unnecessary; on
Finding 5, evidence the audit/aviation research was already run and resolved elsewhere in
the hub repo, which this session could not see.
