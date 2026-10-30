# Conference talks & CFPs

Wycliffe Maina's reusable speaking catalog and conference pipeline.

**Mission:** help the TypeScript ecosystem build useful, dependable AI applications. Bring Angular expertise, agent engineering, and open-source work on [skein-js](https://github.com/skein-js/skein-js) into practical sessions developers can apply.

## Start here

- [Speaker profile and bios](speaker.md)
- [Speaking strategy and audience fit](strategy.md)
- [CFP and submission tracker](cfps/README.md)
- [Delivery history](deliveries/README.md)
- [Shared demo plan](demos/README.md)
- [Evidence and open questions](sources/README.md)

## Three core sessions

Maintain a small catalog, repeat it, and improve it using delivery feedback. The same session can have several audience variants and many submissions or deliveries.

| ID | Core session | Best fit | Material status |
| --- | --- | --- | --- |
| T01 | [Your Agent Works. Will It Survive Tomorrow?](talks/T01-reliable-agents.md) | TypeScript, AI, backend; Angular variant available | Existing accepted proposal; delivery readiness unverified |
| T02 | [Beyond the Demo: Building Reliable AI Agents with Gemini and Cloud Run](talks/T02-gemini-cloud-run.md) | Google developer events, cloud, full stack | Existing session draft; delivery readiness unverified |
| T03 | [Beyond the Chat Box: Building Agent-Driven Interfaces in Angular](talks/T03-angular-agent-ui.md) | Angular and frontend conferences | New proposed session; demo to build |

[Build Agentic Application with LangGraph](https://luma.com/hp7jn59h) is retained as a two-hour workshop record and a potential T01 workshop adaptation. Its occurrence does not establish that every planned demo exists.

## Workflow

1. Add a discovered conference to the opportunity table, even before a CFP opens.
2. Choose T01, T02, or T03 and an audience variant. Adapt the problem, examples, and learning outcomes to that audience.
3. Copy [the submission template](templates/submission.md) into `cfps/submissions/`. Save the exact title and abstract sent; never rewrite a submitted snapshot to match later catalog edits.
4. Update the tracker when actually submitted, accepted, rejected, withdrawn, or delivered. A draft or invitation is not a submitted or accepted CFP.
5. Record each delivery separately using [the delivery template](templates/delivery.md), linking slides, demo version, recording, and feedback.
6. Improve the canonical session after each delivery. Preserve earlier submissions and delivery records.

Use dates as `YYYY-MM-DD`; deadlines need an exact time and timezone. Use `Unknown` when evidence is missing. Do not assume a new event year shares the prior year's CFP dates.

## Repository scope

Markdown is the source of truth; no application, dependencies, or build step is needed. Git history tracks revisions. GitHub issue forms provide optional task intake; the tables and records remain authoritative. Start private for working proposals; decide separately which materials to publish. Contact details, registration data, and unredacted screenshots are intentionally omitted.
