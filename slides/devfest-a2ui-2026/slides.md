---
theme: default
layout: default
colorSchema: light
title: "When Agent Responses Become Interfaces: A2UI with Angular"
author: Maina Wycliffe
aspectRatio: 16/9
canvasWidth: 980
transition: none
fonts:
  provider: none
  sans: Arial
  mono: Menlo
---

<div class="cover">
  <div class="cover-brand">
    <img src="/devfest/bracket-open.svg" alt="" /> DevFest 2026 <img src="/devfest/bracket-close.svg" alt="" />
  </div>
  <div class="cover-grid">
    <div>
      <div class="cover-title-card">
        <h1>When Agent Responses Become Interfaces</h1>
        <div class="cover-subtitle">A2UI with Angular</div>
      </div>
    </div>
    <figure class="cover-speaker">
      <img src="/maina-speaker.jpg" alt="Portrait of Maina Wycliffe" />
      <figcaption>
        <strong>Maina Wycliffe</strong>
        <span>Founder of Garatropic<br />Creator of skein-js<br />Angular GDE</span>
        <nav class="speaker-socials" aria-label="Maina Wycliffe on social platforms">
          <a href="https://github.com/mainawycliffe">GitHub</a>
          <a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn</a>
          <a href="https://x.com/_mainawycliffe">X</a>
        </nav>
      </figcaption>
    </figure>
  </div>
</div>

<!--
0:00–0:45

I’m Maina Wycliffe, founder of Garatropic and creator of skein-js. Let’s start with a question you could ask any travel agent. “Can I fly from Nairobi to Mombasa on Friday for under eight thousand shillings?” We’ll follow one traveller all the way to a booking. The flights and the checkout in this talk are fictional.

Visual reference https://developers.google.com/community/devfest/
Speaker profile https://mainawycliffe.dev/
-->

---

<JourneyScene :stage="1" />

<!--
0:45–3:00

[Advance to this slide. The chat appears by itself.] Which flight would you pick? Give people a few seconds. Ask how they found the 08:10 departure and which options fit the budget. [Press Right once to reveal the interface.] Same three options. Time and price line up, and each row is a choice. I can see why the low fare fits before I select it.

The interface helps the traveller compare. A2UI stands for Agent-to-UI. The agent can describe what to show, and the app supplies the controls. These panels illustrate the experience we want to build.
-->

---

<JourneyScene :stage="2" />

<!--
3:00–5:00

I picked JM-204. Now I want a window seat. The chat is accurate, but I have to turn a sentence about row 12 into a picture in my head. On the right I can see the aisle and the windows. The cross and check carry the occupied and selected states even if you miss the colors.

Notice two separate actions. Highlighting a seat can stay local. I confirm it when I’m ready to advance. The agent can receive a named event with these identifiers. Ask the room which clicks they would keep local in an app they maintain.
-->

---

<JourneyScene :stage="3" />

<!--
5:00–6:45

The next job is data entry. When I mistype the email, I can correct that one field and check the rest before continuing. The demo form asks for a passport number and uses fictional details. In a real booking, ask only for the identification the carrier needs and collect it in a trusted form.

The storyboard shows readiness feedback. The flight prototype checks for nonempty values on its required fields. It does not perform production identity verification.
-->

---

<JourneyScene :stage="4" />

<!--
6:45–8:30

Now the traveller is about to spend money. The action belongs next to its consequences. I can check the itinerary, seat and total together, then decide whether to pay. The button should make the next step clear. We’ll return to this moment after seeing the wire formats.

The flight demo simulates payment locally. Use dummy values only. A real application would use trusted checkout and verify the booking inputs, price and caller on the backend.
-->

---

<JourneyScene :stage="5" />

<!--
8:30–9:10

I can spot the reference as soon as the receipt appears. The same trip gave us five different jobs: comparing, choosing, filling in details, checking the total, and finding the receipt. Each job had a view suited to it.

Ask the room which version they’d want if they only needed the reference. Advance to look at what each format does well.
-->

---

# How much UI is enough?

<svg class="sweet-spot-chart" viewBox="0 0 820 308" role="img" aria-label="Illustrative line chart of ease of use as a response adds more controls">
  <rect v-click="2" class="sweet-spot-band" x="301" y="33" width="218" height="231" rx="10" />
  <path class="chart-axis" d="M88 40 V264 H760" />
  <text x="88" y="27">Ease of use</text>
  <text x="88" y="293">Mostly text</text>
  <text x="760" y="293" text-anchor="end">Lots of controls</text>
  <path v-click="1" class="chart-line" d="M108 231 C211 219 302 86 410 86 C520 86 614 195 738 229" />
  <g v-click="2" class="sweet-spot-label">
    <circle cx="410" cy="86" r="8" />
    <text x="410" y="135">Sweet spot</text>
    <text x="410" y="164">Short text + useful controls</text>
  </g>
</svg>

<div class="source-note">Illustrative curve · The best mix depends on the task · <a href="https://aclanthology.org/2026.findings-acl.74/">Research by Chen et al.</a></div>

<!--
9:10–9:40

Ask how much interface we actually needed for that trip. [Click 1.] A simple answer may only need text. For a decision, a small control can save work. Extra controls can get in the way. [Click 2.] Here’s the mix we’d try for the seat choice. Say what changed and give the traveller a way to act.

The line is a sketch. In Figure 3a, generated UI was preferred in 80% of the study’s comparisons for interactive tasks and 73% for general conversation. Those percentages compare response formats. They do not measure the curve or prescribe how much UI to use.

Paper https://aclanthology.org/2026.findings-acl.74/
Author demos https://salt-nlp.github.io/generative_interfaces/
Related video covering the paper https://www.youtube.com/watch?v=0he3LCqPl98
-->

---

# Which months went over budget?

<p class="lead">A shop’s monthly expenses in KES thousands</p>

<div class="finance-comparison">
<section class="finance-panel">

## Markdown response

Budget of KES 500,000 each month.

| Month | Expenses |
| --- | ---: |
| Jan | 460 |
| Feb | 475 |
| Mar | 490 |
| Apr | 540 |
| May | 575 |
| Jun | 485 |

</section>
<section v-click="1" class="finance-panel">
  <h2>Line chart</h2>
  <svg class="finance-chart" viewBox="0 0 434 265" role="img" aria-label="Monthly expenses rise above the 500-thousand-shilling budget in April and May, then fall below it in June">
    <g class="finance-grid">
      <path d="M52 24 H412 M52 91 H412 M52 157 H412 M52 224 H412" />
      <text x="44" y="29">600</text><text x="44" y="96">550</text>
      <text x="44" y="162">500</text><text x="44" y="229">450</text>
    </g>
    <path v-click="2" class="finance-overage" d="M213.2 157.3 L266 104 L332 57.3 L387 157.3 Z" />
    <path class="finance-budget" d="M52 157.3 H412" />
    <text x="62" y="145" class="finance-budget-label">Budget 500</text>
    <polyline class="chart-line" points="68,210.7 134,190.7 200,170.7 266,104 332,57.3 398,177.3" />
    <g class="finance-points">
      <circle cx="68" cy="210.7" r="4" /><circle cx="134" cy="190.7" r="4" />
      <circle cx="200" cy="170.7" r="4" /><circle cx="266" cy="104" r="4" />
      <circle cx="332" cy="57.3" r="4" /><circle cx="398" cy="177.3" r="4" />
    </g>
    <g v-click="2" class="finance-alerts">
      <circle cx="266" cy="104" r="6" /><circle cx="332" cy="57.3" r="6" />
      <text x="266" y="90">540</text><text x="332" y="43">575</text>
    </g>
    <g class="finance-months">
      <text x="68" y="248">Jan</text><text x="134" y="248">Feb</text>
      <text x="200" y="248">Mar</text><text x="266" y="248">Apr</text>
      <text x="332" y="248">May</text><text x="398" y="248">Jun</text>
    </g>
  </svg>
  <p v-click="2" class="finance-answer">April and May were over budget.</p>
</section>
</div>

<div class="source-note">Fictional data</div>

<!--
9:40–10:30

Imagine you run this shop and you’re checking expenses on your phone. Which months went over KES 500,000? Give the audience a moment to scan the Markdown table. [Click 1.] The line chart uses the same values and budget. You can see where the expense line crosses the budget. [Click 2.] A short sentence and the highlighted points answer the question. The table makes it easy to look up the exact amount for any month.

Let’s see how the Angular flight demo can pick a view suited to each step.
-->

---

# Flight booking in Angular

<div class="demo-ticket">
  <div class="ticket-route"><span>Nairobi</span><span aria-hidden="true">→</span><span>Mombasa</span></div>
  <div class="ticket-prompt">“Find me a flight on Friday for under KES 8,000.”</div>
  <div class="ticket-steps"><span>Compare flights</span><span>Pick a seat</span><span>Open the JSON drawer</span></div>
</div>

<div class="source-note">The flight demo uses its own JSON format.</div>

<!--
10:30–15:30

[Switch to the already open ng-a2ui browser. Keep it maximized. Use a fresh tab or reload.] Type “Fly Nairobi to Mombasa Friday under 8,000 KES.” Open Agent payload when the fares appear. The app uses its own RenderInstruction format. The A2UI v1.0 wire format comes later. Point at kind, instruction.component, and props. Collapse the drawer. Click a flight, then choose an available seat and confirm it. Show the passenger form and fill it with the on-stage values in the project README. Continue to payment. Pause at the fare, then finish the simulated payment and show the fake receipt.

If a turn errors or takes more than 15 seconds, switch to the backup tab linked in the README. Start with the relevant card or replay the full flow. Resume at the next slide after this one. The live model can choose different sample flights and seats.

Sources
https://github.com/mainawycliffe/ng-a2ui/tree/bdb1b09253e6f9906b22bbaf78d8a07d6d6b4593
https://github.com/mainawycliffe/ng-a2ui/blob/bdb1b09253e6f9906b22bbaf78d8a07d6d6b4593/server/schema.ts
-->

---
clickAnimation: up fade-in
---

# JSON is the solution

<p class="lead">Give the model a schema for its answer.</p>

<div class="flow structured-steps">
  <div v-click="1">
    <strong>Schema</strong>
    <dl>
      <div><dt><code>seatId</code></dt><dd>text</dd></div>
      <div><dt><code>available</code></dt><dd>true or false</dd></div>
    </dl>
  </div>
  <span v-click="1" class="connector" aria-hidden="true">→</span>
  <div>
    <strong>Model response</strong>
    <div class="structured-response">
      <div v-click.hide="1">
        <span class="response-format">Plain text</span>
        <p class="structured-prose">Seat 12A is available.</p>
      </div>
      <div v-click="1">
        <span class="response-format">JSON</span>
        <pre class="example-code"><code>{
  "seatId": "12A",
  "available": true
}</code></pre>
      </div>
    </div>
  </div>
  <span v-click="2" class="connector" aria-hidden="true">→</span>
  <div v-click="2">
    <strong>App validation</strong>
    <div class="seat-status"><span aria-hidden="true">✓ </span>Matches the schema</div>
  </div>
</div>

<!--
15:30–16:40

Start with the sentence a traveller would read in a chat. The app needs the seat ID and availability in predictable fields so it can show the right controls. [Click 1.] Give the model a schema and replace the sentence with JSON carrying the same information. The schema requires a text seat ID and a boolean for availability. A structured-output API can constrain generation to a supported schema. [Click 2.] Check the parsed response before using it. The string "true" would fail the boolean check. The booking server still checks if 12A is free when the traveller tries to reserve it.

https://a2ui.org/specification/v1.0-a2ui/#usage-pattern-the-prompt-generate-validate-loop
https://json-render.dev/docs/catalog
-->

---
clickAnimation: up fade-in
---

# What the client receives

<div class="wire-comparison">
  <div>
    <h2>A2UI</h2>
    <p>JSON Lines · one message per line</p>
    <div class="wire-lines">
      <pre class="example-code"><code>{"createSurface": {…}}</code></pre>
      <pre v-click="1" class="example-code"><code>{"updateComponents": {…}}</code></pre>
      <pre v-click="2" class="example-code"><code>{"updateDataModel": {…}}</code></pre>
    </div>
  </div>
  <div v-click="3">
    <h2>json-render</h2>
    <p>One JSON spec</p>
    <pre class="example-code"><code>{
  "root": "seatCard",
  "elements": {…}
}</code></pre>
    <p class="wire-note">Can also stream JSON patches.</p>
  </div>
</div>
<div class="source-note">Payloads shortened</div>

<!--
16:40–18:00

We can use structured data to describe a screen. In this A2UI example, each line is an individual message for the same surface. Start with createSurface. [Click 1.] Add the components. [Click 2.] Update the data. The example leaves out the version and message details. JSON Lines is one way to send A2UI messages. A2UI v1.0 can also include starting components and data in createSurface.

[Click 3.] The json-render React renderer takes a JSON spec with a starting element and the elements it can render. When you stream it, the client applies one JSON patch per line to build or update the spec. The SDK or server can translate model output to the format the client receives. Both approaches let the app render known components. Let’s see that last step in the Angular demo.

https://a2ui.org/specification/v1.0-a2ui/#transport-decoupling
https://json-render.dev/docs/specs
https://json-render.dev/docs/streaming
-->

---

# How Angular shows a card

<div class="split split-wide">
  <div class="code-stack">
    <div><div class="code-caption">The agent names the card</div><pre class="example-code"><code>"component": "FlightComparisonCard"</code></pre></div>
    <div v-click="1"><div class="code-caption">Angular finds the matching component</div><pre class="example-code"><code>componentType(inst.component)</code></pre></div>
  </div>
  <div v-click="2" class="example-card seat-preview">
    <h2>Nairobi to Mombasa</h2>
    <div class="flight-preview"><strong>JM-204</strong><span>KES 7,400</span></div>
    <div class="example-button">Select flight</div>
  </div>
</div>
<div class="source-note">Flight demo · custom JSON format</div>

<!--
18:00–19:00

Start with the component name from the demo’s RenderInstruction. [Click 1.] The app looks up the matching Angular class in a registry it owns. [Click 2.] NgComponentOutlet mounts the class and passes inst.props as Angular inputs. Point to the rendered card. The app wrote that component ahead of time. The full instruction also carries a conversational message.

The prototype shares TypeScript types with the frontend, and Genkit uses the Zod schema on the server. A typed HTTP response on the client is a compile-time annotation. In a production host I would parse incoming data at runtime and handle an unsupported component before mounting the view.

Sources
https://github.com/mainawycliffe/ng-a2ui/blob/bdb1b09253e6f9906b22bbaf78d8a07d6d6b4593/src/app/components/ai-ui-host.ts
https://github.com/mainawycliffe/ng-a2ui/blob/bdb1b09253e6f9906b22bbaf78d8a07d6d6b4593/src/app/agent/component-registry.ts
https://angular.dev/api/common/NgComponentOutlet
-->

---

# What happens when you pick a flight?

<div class="click-diagram">
  <div class="example-card seat-preview">
    <h2>JM-204</h2><p>KES 7,400</p>
    <div class="example-button">Select flight</div>
  </div>
  <span v-click="1" class="diagram-arrow" aria-hidden="true">→</span>
  <div class="code-stack">
    <div v-click="1"><div class="code-caption">The card emits an event</div><pre class="example-code"><code>FLIGHT_SELECTED</code></pre></div>
    <div v-click="2"><div class="code-caption">The app sends it to the agent</div></div>
  </div>
  <span v-click="3" class="diagram-arrow" aria-hidden="true">→</span>
  <div v-click="3" class="example-card seat-preview">
    <h2>Choose a seat</h2>
    <div class="mini-cabin" aria-label="12A and 12C are free. 12B is occupied."><span>12A</span><span>×</span><span>12C</span></div>
  </div>
</div>

<!--
19:00–20:00

Start with the flight option. [Click 1.] The card emits FLIGHT_SELECTED through AgentBus with the flight ID, airline and sample price. [Click 2.] The host adds it to the conversation as a user message and posts the history to the agent. [Click 3.] The agent returns SeatMapCard in the next response. Highlighting an available seat stays local until the traveller confirms it.

The demo uses its own response format. Now let’s see how A2UI describes that seat view.
-->

---

# A2UI calls a view a surface

<p class="lead">The app renders it with components from its catalog.</p>

<div class="flow" aria-label="A2UI creates a surface, sets its components, and updates its data model">
  <div><strong>Create the view</strong><code>createSurface</code></div><span v-click="1" class="connector" aria-hidden="true">→</span>
  <div v-click="1"><strong>Add the text and button</strong><code>updateComponents</code></div><span v-click="2" class="connector" aria-hidden="true">→</span>
  <div v-click="2"><strong>Update the seat status</strong><code>updateDataModel</code></div>
</div>

<div class="surface-shell" aria-label="The seats surface appears inside the booking app">
  <div class="surface-app"><strong>Booking app</strong><span>Chat</span><span>Itinerary</span></div>
  <div class="surface-illustration">
    <span class="surface-label">A2UI surface <code>seats</code></span>
    <div v-click="1">
      <div class="seat-update">
        <div v-click.hide="2">Checking seat 12A…</div>
        <div v-click="2"><strong>12A is available</strong></div>
      </div>
      <span class="surface-button">Use seat 12A</span>
    </div>
  </div>
</div>
<div class="source-note"><a href="https://a2ui.org/guides/client-integration/#step-1-install-dependencies">A2UI v1.0 client integration guide</a></div>

<!--
20:00–22:00

A2UI is a protocol for describing and updating UI. A surface is a view the app can put next to the chat, like this seat card. It has an ID, components, and its own data. The catalog tells the agent which components exist and which inputs they accept. [Click 1.] Add the app’s text and button. [Click 2.] Change the seat status. The order matters. A2UI 1.0 can also initialize components and data in createSurface. The next slide shows how a data change reaches the text.

We’re going to recreate the decision we just saw. Show a summary for seat 12A and give the user one explicit action.

Sources
https://a2ui.org/specification/v1.0-a2ui/
https://a2ui.org/guides/client-integration/#step-1-install-dependencies
-->

---

# A2UI updates the seat status

<div class="split split-wide">
  <div class="code-stack">
    <div><div class="code-caption">The text reads from the data model</div><pre class="example-code"><code>"text": { "@path": <span class="focus">"/seat/summary"</span> }</code></pre></div>
    <div v-click="1"><div class="code-caption">The update writes to the same path</div><pre class="example-code"><code>"path": <span class="focus">"/seat/summary"</span>,
"value": "12A is available"</code></pre></div>
  </div>
  <div class="example-card seat-preview">
    <div class="code-caption">Flight JM-204</div>
    <h2>Seat 12A</h2>
    <div class="seat-update">
      <div v-click.hide="1" class="seat-status pending">Checking seat 12A…</div>
      <div v-click="1" class="seat-status">✓ 12A is available</div>
    </div>
  </div>
</div>

<!--
22:00–24:30

The Text component points at a JSON Pointer on the data model. Start with the binding and the pending state. [Click 1.] Match the highlighted paths and show how the card can move from checking to available. If availability changes while the screen is open, another data message changes the displayed summary without rebuilding the tree. In our full source example the initial model already has a seat object. This update replaces a leaf.

Show the UI as an illustration. The real v1.0 Angular playground capture is coming after both wire examples. Angular support is demonstrated with the playground’s pinned renderer and native component overrides. Avoid inferring broader renderer compatibility.

Sources
https://a2ui.org/specification/v1.0-a2ui/
https://github.com/skein-js/skein-js/blob/c44eb62672ede12f42ef596c6f0f05860b181d3d/docs/recipes/a2ui.md
-->

---

# What A2UI sends on a click

<div class="split split-narrow">
  <div class="example-card seat-preview">
    <div class="code-caption">Flight JM-204</div>
    <h2>12A is available</h2>
    <div class="example-button">Use seat 12A</div>
  </div>
  <div class="code-stack">
    <div v-click="1">
      <div class="code-caption">Read the seat ID</div>
      <pre class="example-code"><code>{ "@path": "/seat/id" }</code></pre>
    </div>
    <div v-click="2">
      <div class="code-caption">Send the action to the agent</div>
      <pre class="example-code"><code>"name": "selectSeat",
"context": { <span class="focus">"seatId": "12A"</span> }</code></pre>
    </div>
  </div>
</div>

<!--
24:30–27:00

Point to the button. [Click 1.] On click, the renderer reads the value at the JSON Pointer /seat/id in the local data model. [Click 2.] It includes 12A in the outgoing selectSeat action. The excerpt leaves out the surface ID and source component ID. The full message also has version 1.0 and a timestamp. The app routes the event to the operation it supports. The agent might generate another update after receiving the action. For a real Angular client, the official setup guide installs the renderer and core, registers a catalog, mounts surfaces and connects the transport. The pinned Angular renderer uses the selector a2ui-v09-surface for v1.0 too. See the linked guide for its exact versions.

That is the whole A2UI loop: describe the view, update its data, and send the action back. What would it take to show the same seat and button with json-render?

Source
https://a2ui.org/concepts/messages/
-->

---

# What json-render lets the model use

<div class="split split-wide">
  <div class="example-card">
    <h2>The catalog names what’s allowed</h2>
    <ul class="catalog-items"><li><code>Button</code></li><li><code>selectSeat</code></li></ul>
  </div>
  <div v-click="1" class="example-card seat-preview">
    <h2>The app provides the button and handler</h2>
    <div class="example-button">Use seat 12A</div>
    <div class="seat-status"><code>selectSeat</code> handler</div>
  </div>
</div>

<!--
27:00–29:00

The example uses the React schema from json-render. The app calls defineCatalog(schema, …) and uses Zod to describe the allowed shapes. Button has a string label and selectSeat takes a string seatId. [Click 1.] The registry pairs the catalog names with the real React button and the handler. The handler can update app state or call a backend endpoint. The Card entry in the complete example accepts children in its default slot.

Explain why the catalog is the model’s vocabulary, and why that vocabulary should match the design system and operations the app has implemented. Use the working React playground as evidence for this stack.

Sources
https://json-render.dev/docs/catalog
https://json-render.dev/docs/registry
-->

---

# The same seat card in json-render

<div class="split split-wide">
  <div class="code-stack">
    <div>
      <div class="code-caption">The spec puts text and a button inside the card</div>
      <pre class="example-code"><code>"children": ["summary", "seatButton"]</code></pre>
    </div>
    <div v-click="1">
      <div class="code-caption">The text reads from state</div>
      <pre class="example-code"><code>"content": { "$state": <span class="focus">"/seat/summary"</span> }</code></pre>
    </div>
  </div>
  <div v-click="2" class="example-card seat-preview">
    <div class="code-caption">Flight JM-204</div>
    <h2>12A is available</h2>
    <div class="example-button">Use seat 12A</div>
  </div>
</div>

<!--
29:00–31:20

This React spec uses a root ID and an elements map. The root is seatCard. Its children array names the summary text and the seat button by ID. Each element gets a type, props and children. [Click 1.] The summary reads from application state at /seat/summary. [Click 2.] Show the resulting view. The renderer looks up every component type in the registry.

Line up the concepts with the previous example. Both separate the application’s components from their generated description. A2UI uses protocol messages for surfaces and data updates. This json-render example uses a typed spec and application state.

Sources
https://json-render.dev/docs/specs
https://json-render.dev/docs/data-binding
-->

---

# What json-render does on a click

<div class="split split-narrow">
  <div class="example-card seat-preview">
    <div class="code-caption">Flight JM-204</div>
    <h2>12A is available</h2>
    <div class="seat-update">
      <div v-click.hide="2" class="example-button">Use seat 12A</div>
      <div v-click="2" class="example-button">Confirm seat 12A</div>
    </div>
  </div>
  <div class="code-stack">
    <div v-click="1"><div class="code-caption">The app runs the named action</div><pre class="example-code"><code>"action": <span class="focus">"selectSeat"</span>,
"params": { "seatId": "12A" }</code></pre></div>
    <div v-click="2"><div class="code-caption">A separate update changes the label</div><pre class="example-code"><code>"op": "replace",
"value": "Confirm seat 12A"</code></pre></div>
  </div>
</div>

<!--
31:20–34:00

Point to the button. [Click 1.] Its on.press binding invokes the app’s selectSeat handler with seat 12A. The handler can update local state or call a backend. Separately, json-render can stream patches to the spec. [Click 2.] This illustrative replace patch targets /elements/seatButton/props/label. The wire stream uses one JSON object per line. Both excerpts are in the full local examples.

If asked for a concrete code example of application validation, point to the Skein json-render recipe. The playground compiles patches, validates the completed spec, and preserves permitted event bindings separately for the pinned release.

Sources
https://json-render.dev/docs/registry
https://json-render.dev/docs/streaming
https://github.com/skein-js/skein-js/blob/c44eb62672ede12f42ef596c6f0f05860b181d3d/docs/recipes/json-render.md
-->

---

# Both playgrounds ask for approval

<div class="project-captures">
  <figure>
    <img src="/demo/skein-a2ui-approval.jpg" alt="Skein Angular A2UI playground showing a generated comparison and review controls" />
    <figcaption><strong>A2UI</strong> with Angular</figcaption>
  </figure>
  <figure v-click="1">
    <img src="/demo/skein-json-render-approval.jpg" alt="Skein React json-render playground showing a generated comparison and review controls" />
    <figcaption><strong>json-render</strong> with React</figcaption>
  </figure>
</div>

<!--
34:00–35:45

Start with the Angular playground and point to Approve UI, which is a host control. [Click 1.] Show the React playground doing the same thing. Both captures use the Product comparison cards offline sample. The graph checkpoints the generated interface, then pauses in a separate review step. Approval records the decision and enables generated controls for the latest response. If I reload while the demonstration backend is running, it reopens the saved state. That review is a choice the playground apps make. Now return to the flight. What should the app do when a view fails, or when valid UI reaches a booking operation?

Sources
https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/a2ui
https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/json-render
-->

---

# When the seat map won’t load

<div class="split split-narrow recovery">
  <div>
    <h2>The app can’t render the requested component</h2>
  </div>
  <div v-click="1" class="message-box">
    <h2>We couldn’t show the seat map</h2>
    <p>Your flight is still selected.</p>
    <p class="keep"><strong>JM-204</strong> · Nairobi to Mombasa</p>
    <div class="recovery-action">Try again</div>
  </div>
</div>

<!--
35:45–37:10

Check the message against its schema and make sure the client supports the requested component. Suppose the agent describes a map component that this client version can’t render. [Click 1.] Keep the chosen flight visible and give the traveller a way to retry. The application decides what to preserve and which fallback it can offer safely. An older client, an unknown component, or bad props can all land here.

This illustrates a production recovery design. The Angular flight app demonstrates structured generation and typed mapping. The Skein examples implement recovery to a saved valid UI when a new result fails.
-->

---

# The fare just went up

<div class="fare-scenario">
  <div class="fare-price">
    <span>Price you saw</span><strong>KES 7,400</strong>
  </div>
  <span v-click="1" class="fare-arrow" aria-hidden="true">→</span>
  <div v-click="1" class="fare-price new-fare">
    <span>Current fare</span><strong>KES 8,250</strong>
  </div>
</div>
<p v-click="1" class="lead fare-description">Over the KES 8,000 budget.</p>
<div v-click="2" class="fare-result">The server checks permission and price. The traveller confirms the new fare.</div>

<!--
37:10–38:25

Return to the pay button. The user saw KES 7,400. [Click 1.] The current price comes back as KES 8,250. Ask whether anyone would complete the booking. [Click 2.] A valid message only tells us the data has the right shape. The backend checks who is booking, which seat is available and what the current quote says. It can offer the new terms and wait for fresh confirmation, or let the traveller go back to search.

If asked about double clicks, mention that a real booking endpoint also needs an idempotency strategy. The prototype payment and booking are simulations. Close by asking participants to remember the decisions the user now makes directly.
-->

---

# Your first interactive response

<div class="build-steps" aria-label="A small project to try">
  <div class="build-step">
    <div class="build-illustration"><div class="draw-card"><span></span><span></span></div></div>
    <strong>One card</strong>
  </div>
  <div v-click="1" class="build-step">
    <div class="build-illustration"><div class="draw-button">Use seat 12A</div></div>
    <strong>One button</strong>
  </div>
  <div v-click="2" class="build-step">
    <div class="build-illustration"><div class="draw-check" aria-hidden="true">✓</div></div>
    <strong>One server check</strong>
  </div>
</div>

<!--
38:25–39:00

Ask the room to think of something their users keep typing back to a chatbot, like a seat number or a time slot. Start with one card that shows the choice. [Click 1.] Add one button that passes it back. [Click 2.] Add a server check, such as whether that slot is still free.

[Pause after the takeaway. Advance to thank the audience.]
-->

---

<div class="end-frame">
  <div class="end-card thank-you">
    <div>
      <h1>Thank you</h1>
      <p>Maina Wycliffe</p>
      <a href="https://mainawycliffe.dev/">mainawycliffe.dev</a>
      <nav class="speaker-socials" aria-label="Maina Wycliffe on social platforms">
        <a href="https://github.com/mainawycliffe">GitHub</a>
        <a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn</a>
        <a href="https://x.com/_mainawycliffe">X</a>
      </nav>
    </div>
    <nav class="closing-resources" aria-labelledby="resources-title">
      <h2 id="resources-title">Get started</h2>
      <h3>Examples</h3>
      <ul>
        <li><a href="https://github.com/mainawycliffe/ng-a2ui">Angular flight demo</a></li>
        <li><a href="https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/a2ui">skein-js A2UI playground</a></li>
        <li><a href="https://github.com/skein-js/skein-js/tree/c44eb62672ede12f42ef596c6f0f05860b181d3d/examples/json-render">skein-js json-render playground</a></li>
      </ul>
      <h3>Guides</h3>
      <ul>
        <li><a href="https://a2ui.org/guides/client-integration/#step-1-install-dependencies">A2UI Angular setup</a></li>
        <li><a href="https://json-render.dev/docs/quick-start">json-render quick start</a></li>
      </ul>
    </nav>
  </div>
</div>

<!--
39:00–39:30

Thank the audience. Point to the flight demo and both skein-js playgrounds. The A2UI guide covers Angular setup and the json-render quick start covers the React catalog and renderer. [Give the room a moment to take a photo, then press Right.]
-->

---
transition: slide-left
---

<div class="one-more">
  <h1>One more thing</h1>
</div>

<!--
39:30–39:35

Say “One more thing.” [Pause, then press Right.]
-->

---
transition: slide-left
---

<div class="end-frame">
  <div class="end-card skein-intro">
    <div>
      <h1>skein-js</h1>
      <p>Host your own LangGraph.js agents.</p>
    </div>
    <div class="qr-block">
      <img src="/skein-github-qr.png" alt="QR code for the skein-js repository on GitHub" />
      <strong>Star it on GitHub</strong>
      <a href="https://github.com/skein-js/skein-js">github.com/skein-js/skein-js</a>
    </div>
  </div>
</div>

<!--
39:35–41:00 · skein-js
41:00–45:00 · Q&A

I built skein-js because I wanted a TypeScript runtime I could run on my own infrastructure while keeping my LangGraph.js graph and client. The graph defines agent behavior. Skein exposes the API for threads and runs, streams updates, and supports resuming a graph after a decision. In both playgrounds we just saw, the frontend reopens a saved UI from the graph state.

[Leave the QR visible for about 20 seconds.] It takes you to the GitHub repository. If you try it or want to follow the project, I’d appreciate a star. The getting-started guide runs a local echo agent without an API key. If asked for the command, it’s npm create skein-js@latest my-agent. Leave this slide on screen during questions.

Sources
https://github.com/skein-js/skein-js
https://skein.js.org/
https://skein.js.org/getting-started
https://skein.js.org/agent-protocol
-->
