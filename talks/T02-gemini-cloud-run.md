# T02 — Beyond the Demo

- **Canonical title:** Beyond the Demo: Building Reliable AI Agents with Gemini and Cloud Run.
- **Core topic:** deploying useful TypeScript agent applications on Google Cloud.
- **Status:** existing session draft; no acceptance or submission inferred.
- **Evidence:** [S02 session snapshot](../cfps/submissions/S02-draft-gemini-cloud-run.md).
- **Audience:** beginner/intermediate developers at Google, cloud, and full-stack events.
- **Format:** invitation allows 30–60 minute talks or workshops; exact selection unknown. A hands-on workshop requires separate preparation.
- **Participation:** virtual in the source draft.
- **Prerequisites:** basic TypeScript, HTTP, and deployment vocabulary.

## Abstract

The exact existing draft abstract is preserved in [S02](../cfps/submissions/S02-draft-gemini-cloud-run.md). It covers TypeScript, Gemini, LangGraph.js, Cloud Run, persistent state, progress, and approval.

## Learning outcomes — planned

1. Explain why workflow progress must survive a browser disconnect.
2. Place persistent state outside disposable application instances.
3. Identify CPU, worker lifecycle, and concurrency decisions that need explicit deployment design.
4. Reconnect a client and restore a human approval step.

## Suggested 45-minute outline

| Minutes | Section |
| --- | --- |
| 0–5 | What changes between a laptop demo and a deployed service |
| 5–13 | TypeScript agent, Gemini, runtime, client, and persistent state |
| 13–25 | Deploy and follow a ticket workflow |
| 25–34 | Disconnect, reconnect, and approve |
| 34–40 | CPU, worker lifecycle, concurrency, and limitations |
| 40–45 | Questions and resources |

Thirty-minute version: use a prepared deployment and one reconnect scenario. Sixty-minute version: expand deployment choices and debugging. Neither format is yet selected for S02.

## Reuse and differentiation

Reuse the T01 support-ticket story and approved-response flow. This session owns the deployment explanation and Google stack framing. T01 owns the deeper runtime failure analysis. An Angular frontend can provide a familiar client, but the learning promise here remains cloud deployment.

skein-js is a candidate shared runtime for the consolidated demo. The original S02 abstract does not name it; preserve that fact and introduce it transparently in new adaptations if selected. Do not imply the deployment has already been tested.

## Angular audience variant — possible, secondary choice

**Working title:** From Angular to a Deployed AI Agent with Gemini.

Lead with the Angular client and the boundary to a deployed agent. Keep deployment mechanics only when the event has a full-stack or cloud track. Prefer T03 for a frontend-focused track and the T01 Angular variant for long-running work and recovery.

## Delivery readiness

Slides: Unknown. Demo source and cloud deployment: Unknown. Verify current Cloud Run behavior and deployment configuration from official documentation during implementation. Record the selected worker/queue architecture, persistence configuration, concurrency assumptions, costs, and cleanup steps in the demo repository before delivery.
