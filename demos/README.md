# Shared demo plan

Status: proposed consolidation. This repository tracks speaking work; demo code has not been created or verified here.

## One scenario, three views

A support ticket leads to a proposed customer response. A person reviews the evidence and approves the response. Preserve the workflow across browser and server lifecycle changes.

| Module | Session use | Evidence required before delivery |
| --- | --- | --- |
| Ticket and graph | All | Reproducible start, known test input, predictable tool behavior |
| Runtime persistence and retries | T01 | Duplicate submission and restart demonstrated; limits documented |
| Gemini / Cloud Run deployment | T02 | Chosen deployment tested; external state, worker lifecycle, CPU and concurrency decisions documented |
| Angular progress and approval | T03; T01 Angular variant | Disconnect/reconnect, pending approval and error states exercised |
| Agent-generated Angular UI | T03 | Verified renderer and pinned contract, allowlisted components, invalid message handling and server-authorized actions |

A2UI messages and JSON Render specs must have separate validation/rendering paths if both are demonstrated. Verify current support and package versions from primary docs before implementation. Schema validation alone does not authorize an action or guarantee an accessible interface.

## Readiness checklist for each repeat delivery

- [ ] Recover or link existing workshop assets.
- [ ] Pin demo source commit, dependency versions, and model configuration.
- [ ] Run the complete scenario in the delivery environment.
- [ ] Exercise restart/reconnect behavior relevant to the chosen session.
- [ ] Prepare local fixtures, a recording, or screenshots for network/model failure.
- [ ] Remove credentials and attendee data from all presentation assets.
- [ ] Check keyboard access, focus, errors, and readable progress for UI demos.
- [ ] Record measured limitations and update talk claims accordingly.

## Planned formats

- 30-minute talk: one problem, one end-to-end slice, three takeaways.
- 45-minute talk: add a failure scenario and architecture discussion.
- 60-minute session: add implementation depth and audience questions.
- 120-minute workshop: guided modules with setup instructions and checkpoints; separate preparation required.

These are planning options. They do not override the actual duration approved by an organizer.
