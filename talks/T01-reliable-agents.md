# T01 — Your Agent Works. Will It Survive Tomorrow?

- **Core topic:** operating dependable AI agents in TypeScript.
- **Status:** existing accepted proposal; canonical planning additions below are drafts. Demo readiness unverified.
- **Evidence:** [S01 accepted snapshot](../cfps/submissions/S01-accepted-reliable-agents.md).
- **Primary audience:** TypeScript / JavaScript, AI, backend, full-stack developers.
- **Existing format:** 45-minute beginner talk.
- **Prerequisites:** basic TypeScript and HTTP; introduce graph and workflow vocabulary in the session.
- **Resources:** [skein-js](https://github.com/skein-js/skein-js); [shared demo plan](../demos/README.md).

## Canonical title

Your Agent Works. Will It Survive Tomorrow? Operating LangGraph.js with skein-js

## Abstract

The exact accepted abstract is preserved in [S01](../cfps/submissions/S01-accepted-reliable-agents.md). Use that snapshot for the accepted booking; adaptations below must not overwrite it.

## Learning outcomes — planned

1. Separate graph execution from the runtime infrastructure around it.
2. Explain where workflow state and human approvals must live across restarts.
3. Evaluate duplicate submissions, recovery, and the limits of idempotency.
4. Use execution evidence to understand what happened when work fails.

## Suggested 45-minute outline

| Minutes | Section |
| --- | --- |
| 0–5 | Ticket-triage story: reviewer returns tomorrow |
| 5–13 | Model, graph, runtime, and client responsibilities |
| 13–28 | Demo: submit, retry, pause for approval, restart, resume |
| 28–36 | Persistence and background work; guarantee boundaries |
| 36–40 | Operational evidence and reusable failure scenarios |
| 40–45 | Questions and resources |

Timing is a rehearsal plan. Verify each recovery claim against the pinned demo and avoid promising exactly-once external side effects.

## Angular conference variant — draft

**Title:** Your Angular App Reloaded. Did Your Agent Lose Its Work?

**Proposed duration:** 30–45 minutes. **Audience:** Angular developers familiar with services and HTTP.

### Abstract

An Angular application starts an agent task, shows progress, and asks a person to approve a response. Then the user closes the tab. When they return, the application needs to find the same work, explain its state, and offer the right next action.

Using a support-ticket workflow, we’ll connect an Angular interface to a TypeScript agent backend built with LangGraph.js and skein-js. We’ll explore the boundary between component state and durable workflow state, reconnect to an existing task, and restore a pending approval. We’ll also examine what the interface should show when a retry or connection failure leaves the outcome uncertain.

You’ll leave with a plan for keeping long-running agent work understandable from an Angular application, including the state transitions and failure cases to test before shipping.

### Angular outcomes

- Distinguish UI lifecycle from workflow lifecycle.
- Represent progress, disconnection, pending approval, and uncertain outcomes.
- Reconnect using a stable workflow identity rather than starting duplicate work.

Keep backend internals brief; spend the demo time on the Angular user journey. This variant needs a verified Angular client before submission promises are finalized.

## Workshop adaptation — proposed

**Title:** Build Agentic Applications with LangGraph.js and TypeScript.

**Duration:** 120 minutes; separate hands-on preparation required. Reuse the [Builders Space workshop lineage](../deliveries/D01-builders-space-2026-10-28.md) after recovering its assets. Suggested modules: model/tool boundary, graph, hosted runtime, frontend progress, and human approval. Prepare setup instructions, checkpoints, and a fallback for unavailable model access.

## Delivery readiness

Slides: Unknown. Demo commit: Unknown. Recording: Unknown. Existing workshop assets: to recover. For each booking, pin versions and test the exact restart, approval, and duplicate-submission path.
