# Speaking strategy

Working recommendation created 2026-10-30. Audience variants and new abstracts are proposals, not confirmed bookings.

## Positioning

**Help TypeScript developers build AI applications they can understand, operate, and improve.** Angular is the strongest entry point for frontend audiences. skein-js supplies a concrete open-source connection when a session needs agent runtime infrastructure.

Build three core sessions for repeated delivery across a year. Reuse the scenario, diagrams, and selected demo modules while changing the depth and audience framing. Avoid creating a new talk for every CFP.

## How Angular intersects with the interests

| Interest | Angular audience problem | Concrete teaching outcome |
| --- | --- | --- |
| AI agents | An agent is doing work outside the component lifecycle | Represent progress, reconnect to work, handle errors, and expose a meaningful next action |
| A2UI | The agent needs to choose an interface, while the application owns its components | Map validated declarative UI messages to an approved Angular component catalog |
| JSON Render | How do different catalog and schema approaches compare? | Explain the common design problem and compare actual contracts without presenting the projects as interchangeable |
| skein-js | A page reload must not erase a pending operation or approval | Show an Angular client reconnecting to a backend workflow and resuming an approval |
| TypeScript ecosystem | Frontend developers want to contribute to AI products | Share a complete TypeScript architecture and specific contribution opportunities |

A2UI and JSON Render are separate projects with different contracts. For an Angular session, choose and validate one Angular rendering path before committing to a live demo. JSON Render can be a comparison or a separate supported-framework demo; do not promise a ready-made Angular adapter without verifying it. See [primary sources](sources/README.md).

## Audience fit

| Event focus | Lead session / title | Emphasize | Keep secondary |
| --- | --- | --- | --- |
| Angular | T03: Beyond the Chat Box: Building Agent-Driven Interfaces in Angular | Angular components, UI state, validation, interaction, accessibility, approvals | Backend operations and framework comparison |
| Angular full stack | T01 variant: Your Angular App Reloaded. Did Your Agent Lose Its Work? | Client lifecycle versus workflow lifecycle, reconnect, pending approvals | Queue and database implementation detail |
| Google / cloud | T02: Beyond the Demo | Gemini, Cloud Run, external state, scaling tradeoffs | Component-renderer internals |
| TypeScript / JavaScript | T01 | End-to-end TypeScript, agent lifecycle, failure scenarios | Provider-specific deployment |
| AI / backend | T01 | Runtime boundaries, retries, persistence, operational evidence | Angular-specific APIs |

## Reusable demo: support-ticket triage

An agent examines a ticket, proposes a response, and waits for a person to approve sending it. Use the same story across sessions:

- **T01:** duplicate submission, delayed approval, runtime restart, operational inspection.
- **T02:** deployment, external state, browser disconnect and reconnect, scaling decisions.
- **T03:** progress UI, a structured proposal card or form, validation, approval, errors, focus and keyboard behavior.

This is a proposed shared demo, not a claim that existing session demos have already been consolidated. See [demo readiness](demos/README.md).

## Promote through useful engineering

Disclose that you created skein-js. Explain the runtime problem first, demonstrate the chosen solution, and identify tradeoffs and boundaries. End with one clear invitation: try the example, report a limitation, or contribute a small integration. Link the project and supporting sources in the session resources. Learners should leave with patterns they can evaluate even if they choose another runtime.

## Repeat and improve

Suggested cadence, not booked commitments: rehearse one core version, try it with a meetup audience, then repeat at conferences. Review each delivery's questions and rough edges before the next one. Track repeat deliveries, useful attendee feedback, demo reproducibility, and contribution interest when available; do not invent attribution between a talk and project growth.
