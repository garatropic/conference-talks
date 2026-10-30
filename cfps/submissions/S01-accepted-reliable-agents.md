# S01 — accepted proposal snapshot

- Opportunity: O01; conference name and URL unknown.
- Canonical session: [T01](../../talks/T01-reliable-agents.md).
- Source: user attachment 1, transcribed 2026-10-30.
- Status: **Accepted**, as shown in screenshot.
- Submission / acceptance dates: Unknown.
- Format: Talk.
- Duration: 45 minutes.
- Level: Beginner.

## Exact title

Your Agent Works. Will It Survive Tomorrow? Operating LangGraph.js with skein-js

## Abstract — transcribed from attachment

Your agent reviews a support ticket, proposes an action, and pauses for approval. The reviewer returns tomorrow. Meanwhile, your server has restarted, you’ve deployed a new version, and the submitting system has retried its request. The approval must still exist, the retry must resolve to the original work, and an operator needs to understand what happened. Building a useful agent is only the beginning of running a dependable service.

This talk introduces skein-js, an open-source, self-hosted TypeScript server runtime for LangGraph.js agents. LangGraph provides graph execution, checkpointing, and interrupts. skein-js supplies the infrastructure around those graphs: persistent API resources, background execution, streaming, and an operator console, while retaining existing LangGraph.js graphs and SDK clients.

Through an issue-triage demonstration, we’ll follow a workflow through duplicate submission, human approval, and a server restart. We’ll examine how Postgres persistence and Redis-backed background work support reliable execution, where idempotency guarantees end, and how telemetry helps explain failures. Attendees will leave with a concrete architecture for operating agents on infrastructure they control and failure scenarios they can use to evaluate any agent runtime.

## Follow-up

Confirm conference, event date, session slot, acceptance date, and any speaker requirements. The screenshot proves proposal status; it does not establish demo readiness or verify every technical claim for the eventual delivery version.
