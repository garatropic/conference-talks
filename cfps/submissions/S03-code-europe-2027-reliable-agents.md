# S03 — Code Europe AI 2027 proposal

- Status: **Title and abstract finalized on 2026-10-31; not submitted.**
- Opportunity: O04.
- Canonical session: [T01](../../talks/T01-reliable-agents.md), advanced capacity-and-reliability variant.
- Official CFP: https://www.codeeurope.pl/cfp (checked 2026-10-30).
- Intended track: AI Agents & Applied AI.
- Proposed format: 40-minute Stage Talk, Warsaw, 2027-04-22. This is a recommendation, not a travel commitment. A 40-minute Online Talk on 2027-04-21 is an alternative if preferred.
- Level: advanced application engineering; familiarity with tool-calling agents, HTTP, and persistent storage expected.
- Language: English.
- Published deadline: 2027-03-14, 23:59 CET (UTC+01:00), equivalent to 2027-03-15, 01:59 Africa/Nairobi.
- Submitted at / confirmation: Not submitted.

## Final title

The Demo Worked. Then Production Fell Apart.

## Final abstract

My first real-world AI applications worked brilliantly in tests and demos. Then production traffic arrived. Bursts of demand collided with tight model API rate limits, and we had to go back to the drawing board.

This session explores the engineering principles behind that redesign. How do you absorb a burst when your model provider cannot serve requests fast enough? Where should admission control live when multiple workers share the same quota? When should work wait, expire, or be rejected?

Using a TypeScript agent workflow, we’ll examine concurrency control, rate-aware admission, bounded queues, and backpressure. We’ll distinguish request limits from token budgets and explore how retries can amplify overload. We’ll work through backoff with jitter, retry budgets, and deadlines, connecting those backend decisions to what users experience while their work waits.

Drawing on my earlier AI application experience and my current work creating skein-js, I’ll explain the tradeoffs involved in designing around constrained downstream capacity. Attendees will leave with a practical capacity-planning approach and a burst-testing checklist they can apply to their own AI applications—before the next successful demo meets real demand.

## Learning outcomes

1. Translate bursty application demand into downstream request and token budgets.
2. Distinguish concurrency control, rate-aware admission, and queue capacity.
3. Choose retry budgets, deadlines, and overload policies when capacity is constrained.
4. Test bursts and sustained overload, including user-visible waiting and cancellation.

## Narrative and evidence boundaries

The speaker confirmed on 2026-10-30 that early real-world solutions worked well in tests and demos, then production difficulties required a return to the drawing board. The requested focus is engineering for bursts against very low model API rate limits relative to workload demand. **This experience was not from skein-js.** Provider, model, workload, exact quotas, detailed failure symptoms, specific redesign choices, and measured outcomes have not yet been supplied.

The abstract makes no claim about user counts, throughput, latency improvements, specific incident symptoms or a successful historical fix. The controlled example is proposed work. Any later skein-js code must be identified as a separate implementation example, with support verified against a pinned version. Do not present admission control or other planned policies as existing skein-js features without checking.

## Proposed 40-minute flow

| Minutes | Content |
| --- | --- |
| 0–5 | The demo-to-production gap and the decision to redesign; confirmed experience |
| 5–11 | Model bursts, downstream request/token budgets, and available headroom |
| 11–21 | Replay a burst: concurrency limits, rate-aware admission, and bounded queues |
| 21–29 | Backoff with jitter, retry budgets, sustained overload, expiry, and rejection |
| 29–35 | User-visible waiting/cancellation; test results and limitations |
| 35–40 | Takeaways and questions |

Q&A allocation is provisional. Prefer one clear overload experiment over adding unrelated graph recovery or generative UI topics.

## Controlled experiment to build

Use a deterministic simulated model endpoint with a documented request budget; optionally add token-budget simulation as a separate dimension. This permits repeatable overload without spending live quota. Label simulated results clearly and do not equate them with a provider's exact enforcement algorithm.

Compare identical workloads under unrestricted dispatch, bounded concurrency, and shared admission plus a bounded queue. Test a short burst followed by recovery separately from sustained demand above capacity. Show whether queued work drains, meets its deadline, or must be rejected or expired. Configure finite retry attempts, total deadlines, and cancellation handling. Observe completions, attempts per completion, queue depth and age, rejection/expiry counts, and latency distributions. Include multiple workers sharing one budget so a local concurrency setting cannot be mistaken for global control.

No measurements exist yet. Report only results actually obtained, alongside workload, configuration, limitations, and source commit. A shortcoming or unresolved tradeoff is useful evidence; a successful optimization is not required for an honest talk.

## Reviewer notes — draft

I am a Google Developer Expert for Angular and the creator of skein-js. The narrative comes from an earlier AI application that needed redesign when production demand met tight model API rate limits. A separate controlled TypeScript experiment will make the capacity and overload decisions inspectable. This is an advanced adaptation of T01, with the focus narrowed to provider-constrained execution.

Related speaking evidence: [Builders Space workshop listing](https://luma.com/hp7jn59h). This is a listing, not a recording or confirmation of delivery. Add a confirmed speaking recording if available.

## Conference fit

The intended AI Agents & Applied AI track and 40-minute format come from the [2027 CFP](https://www.codeeurope.pl/cfp). The proposal centers on the engineering of bursts and overload against tight downstream limits, using an agent workload as the concrete example. Angular expertise informs the client-facing waiting and cancellation discussion. A2UI, JSON Render, Cloud Run deployment, and a skein-js tour remain outside this session's scope.

## Technical references

[Gemini API rate-limit documentation](https://ai.google.dev/gemini-api/docs/rate-limits) documents request and token limits and provider-specific quota scope. It is a reference for preparation, not evidence that the speaker's earlier application used Gemini. Verify the actual provider's current behavior before describing its limits or retry signals. Do not hard-code changing quotas into the proposal.

## Submission form mismatch

The [form linked by the CFP](https://docs.google.com/forms/d/e/1FAIpQLSfTxVRpbYwVtDOarbfa32w0HFPpDXFh-wxMO4grQBpAjOOhgA/viewform) still has a 2026 heading, dates, submission limit, and track names. Its introduction says it is also collecting 2027 proposals. The CFP page describes a different 2027 program.

Use the 2027 CFP as the planning source. Before submitting, recheck the destination and confirm the intended edition, track mapping, and applicable fields. No abstract length limit or later form fields have been verified; this file is not claimed to be form-ready. No organizer has been contacted.

## Questions for the next refinement

- Which application and provider/model were involved, and what can be shared publicly?
- What did a typical burst look like, which quota was reached, and how did failures appear to users?
- What was tried, and what helped or remained unresolved? Do not infer a fix from the problem alone.
- Are logs, code, or numbers available? If not, keep the story qualitative and use labeled experiments for measurements.

## Before submission

- [ ] Add confirmed details of the original experience and remove any unsupported implication.
- [ ] Build and run the overload experiment; verify that the finalized abstract’s teaching promises are supported.
- [ ] Select and verify any skein-js implementation excerpts.
- [ ] Prepare reproducible results, a fallback trace, and honest limitations.
- [ ] Confirm in-person versus online preference and available speaking evidence.
- [ ] Resolve the form mismatch and verify field limits.
