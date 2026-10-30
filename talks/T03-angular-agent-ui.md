# T03 — Beyond the Chat Box

- **Canonical title:** Beyond the Chat Box: Building Agent-Driven Interfaces in Angular.
- **Core topic:** useful agent interfaces built from application-owned components.
- **Status:** new proposal draft; not submitted, accepted, or demo-ready.
- **Primary audience:** Angular and frontend developers.
- **Suggested format:** 30–45 minute talk; 60-minute deeper adaptation possible.
- **Level:** intermediate; basic Angular components, services, and TypeScript expected.
- **Key interests:** Angular, AI agents, A2UI, JSON Render, human control, and the TypeScript AI ecosystem.

## Proposed abstract

Your agent can explain what it wants to do. Your users still need to inspect the evidence, edit a value, and approve the next action. A chat message alone can make that work awkward.

In this session, we’ll explore an Angular interface for a support-ticket agent. Instead of asking a model to invent executable frontend code, we’ll define a controlled component catalog and examine how validated declarative messages can select an appropriate view. We’ll use A2UI as the main protocol reference and compare its approach with JSON Render, making the boundaries between the two explicit.

The demo plan follows a task from streamed progress to a proposed response and human approval. We’ll discuss how Angular owns the components and interaction state, how invalid or unsupported messages are handled, and why the server must authorize actions independently of what the model displays.

You’ll leave with an architecture for agent-driven interfaces in Angular and practical questions to ask about validation, accessibility, and recovery before adopting a rendering approach.

**Before submitting:** choose and test the Angular renderer, pin the protocol and package versions, and replace “demo plan” with a concrete tested demo description. This draft is intentionally not a promise of an existing implementation.

## Learning outcomes

1. Separate agent decisions, declarative UI descriptions, Angular rendering, and server-side action authorization.
2. Define an approved component catalog and validate incoming UI messages.
3. Model streamed progress, pending approval, unsupported content, and failure states.
4. Compare A2UI and JSON Render without assuming protocol or renderer compatibility.

## Suggested 45-minute outline

| Minutes | Section |
| --- | --- |
| 0–5 | Ticket review: where a chat-only interaction becomes awkward |
| 5–12 | Agent, protocol, renderer, and component catalog boundaries |
| 12–27 | Planned Angular demo: progress, proposal card, edit, approve |
| 27–34 | Invalid messages, errors, keyboard/focus behavior, authorization |
| 34–39 | A2UI and JSON Render: comparison and integration decisions |
| 39–45 | Architecture recap, resources, questions |

For 30 minutes, shorten the comparison and keep one successful interaction plus one failure state. A hands-on workshop is outside the current prepared scope.

## Demo and integration decisions

Use an Angular support-ticket workspace with progress, evidence, proposed response, and explicit approval. Reuse the T01 backend where practical; identify skein-js as the speaker's project and explain its role briefly.

The Angular rendering implementation is not selected. Verify the current A2UI Angular path against [official renderer documentation](https://a2ui.org/reference/renderers/). Use [JSON Render's own source](https://github.com/vercel-labs/json-render) to establish its supported frameworks and contracts. Do not silently treat one project's JSON as valid input to the other or assume an Angular adapter exists.

## Readiness gates

- [ ] Select and verify the Angular renderer and contract version.
- [ ] Build the controlled component catalog and document validation boundaries.
- [ ] Exercise malformed and unsupported messages.
- [ ] Demonstrate that approval is authorized and validated by the backend.
- [ ] Verify keyboard use, focus handling, readable progress, and error recovery.
- [ ] Prepare a deterministic fallback and pin the demo commit.
- [ ] Rehearse and finalize the CFP abstract to match what actually works.

## Broader frontend variant — draft

**Title:** Beyond the Chat Box: Designing Interfaces for AI Agents.

Use the same interaction story and compare component-catalog approaches across frameworks. Keep Angular as the concrete implementation if it is the only verified demo. This is an adaptation of T03, not a fourth core session.
