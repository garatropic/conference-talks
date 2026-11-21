# DevFest 2026

**When Agent Responses Become Interfaces: A2UI with Angular**

Maina Wycliffe · 45 minutes including Q&A

## Present the deck

Use Node 22.12 or newer.

~~~sh
npm ci
npm run dev
~~~

Open the URL Slidev prints. Use the audience window for projection and open `/presenter` in a second window for timed notes. Slide 2 compares a chat reply with an illustrated interface. Press Right once to reveal the interface. Use the same key to build the sweet-spot chart on slide 7 and the expenses comparison on slide 8. Slide 10 animates a structured response from an LLM. Slide 11 reveals the A2UI and json-render formats one step at a time. The presenter notes say when to advance.

The [offline PDF](../../output/pdf/devfest-2026-a2ui-with-angular.pdf) shows the completed reveal. Slide 24 closes the talk with the speaker’s links, the flight demo, both skein-js playgrounds, and setup guides for A2UI and json-render. Slide 25 is the “One more thing” pause. Slide 26 introduces skein-js and stays on screen for Q&A. Keep the [demo backup](public/demo/flight-backup.html) open in a separate tab if you need it. Resume the talk at slide 10.

## Rehearse the flight demo

Start the [ng-a2ui demo](https://github.com/mainawycliffe/ng-a2ui/tree/bdb1b09253e6f9906b22bbaf78d8a07d6d6b4593) in another window using its README. Test the model configured in the checkout you plan to use on stage. Keep your API key in the demo checkout.

1. Start a clean session and enter **Fly Nairobi to Mombasa Friday under 8,000 KES**. Open **Agent payload** when the comparison appears.
2. Close the drawer. Select a flight, pick any available seat, and confirm it. The live model may produce options that differ from the deck.
3. Use **Alex Demo**, **alex@example.com**, and **DEMO0001** in the passenger form.
4. Pause on the payment card to review the itinerary and fare. Use the placeholder digits `000000000000`, expiry `01/30`, and CVC `000`. The prototype simulates payment and creates a fictional reference.
5. Point to the receipt, then switch back to slide 10. If a turn fails or takes longer than 15 seconds, switch to the backup tab. The screenshots replay the actual Angular components with deterministic, schema-validated responses.

Keep the live model on the flight app only. The Skein slides use offline captures of two separate playgrounds. The final slide’s QR code opens the [skein-js GitHub repository](https://github.com/skein-js/skein-js). The [getting-started guide](https://skein.js.org/getting-started) walks through a keyless local demo.

## Code and sources

- [Generative Interfaces for Language Models](https://aclanthology.org/2026.findings-acl.74/) informed the illustrative sweet-spot chart on slide 7. The [authors’ demos](https://salt-nlp.github.io/generative_interfaces/) show examples from the research.
- [Seat example using A2UI v1.0](examples/seat-a2ui.jsonl), the [A2UI specification](https://a2ui.org/specification/v1.0-a2ui/), and the [official Angular client setup](https://a2ui.org/guides/client-integration/#step-1-install-dependencies).
- [Seat spec using json-render](examples/seat-json-render.json), [streaming patch](examples/seat-json-render-patch.jsonl), and the [json-render specs guide](https://json-render.dev/docs/specs). The teaching spec uses the React schema, the small catalog shown in the deck, and initial state `{ seat: { summary: "12A is available" } }`.
- [Skein Angular playground](https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/a2ui) and [Skein React playground](https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/json-render). Both have deterministic samples that run without a model key. Review is separate from the generated interface.
- The cover and final slide use the hero photo and the cover uses the bracket artwork from [DevFest 2026](https://developers.google.com/community/devfest/). Maina supplied the speaker headshot. The journey illustrations are editable in Slidev.
