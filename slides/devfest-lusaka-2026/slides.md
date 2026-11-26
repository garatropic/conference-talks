---
theme: default
layout: default
colorSchema: light
title: "Beyond the Demo: Building Reliable AI Agents with Gemini and Cloud Run"
author: Maina Wycliffe
seoMeta:
  ogImage: cover.png
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
    <img src="/devfest/bracket-open.svg" alt="" /> DevFest Lusaka 2026 <img src="/devfest/bracket-close.svg" alt="" />
  </div>
  <div class="cover-grid">
    <div class="cover-title-card">
      <h1>Beyond the Demo</h1>
      <p class="cover-subtitle">Building Reliable AI Agents<br />with Gemini and Cloud Run</p>
      <p class="cover-goal">Deploy an agent that saves your progress.</p>
      <p class="cover-stack">TypeScript · LangGraph.js · skein-js</p>
    </div>
    <figure class="cover-speaker">
      <img src="/maina-speaker.jpg" alt="" />
      <figcaption>
        <strong>Maina Wycliffe</strong>
        <span>Chief Builder @ Garatropic<br />Creator of skein-js<br />Angular GDE</span>
        <nav class="speaker-socials" aria-label="Maina Wycliffe’s profiles and company website">
          <a href="https://github.com/mainawycliffe">GitHub @mainawycliffe</a>
          <a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn @mainawycliffe</a>
          <a href="https://x.com/_mainawycliffe">X @_mainawycliffe</a>
          <a href="https://garatropic.com/">garatropic.com</a>
        </nav>
      </figcaption>
    </figure>
  </div>
</div>

<!--
0:00–2:00

I’m Maina Wycliffe, Chief Builder at Garatropic, an Angular GDE, and the creator of skein-js. We’ll see how to deploy a TypeScript agent that saves your work. We’ll ask the demo for a GitHub dashboard, close the tab, and come back to the same draft to approve it. I’ll share a guide you can follow on your own machine.

https://gdg.community.dev/events/details/google-gdg-lusaka-presents-devfest-lusaka-2026/
DevFest hero imagery and brackets https://developers.google.com/community/devfest/
-->

---

# Your connection drops

<script setup>
const previewPoster = import.meta.env.BASE_URL + 'workshop/images/stream.jpg'
</script>

<div class="split hero-question">
  <div>
    <blockquote>Build a dashboard for <strong>skein-js/skein-js</strong> with its description, stars, and forks.</blockquote>
    <p class="callout">Will the draft still be there?</p>
  </div>
  <div class="playground-preview">
    <SlidevVideo autoplay autoreset="slide" muted playsinline controls :poster="previewPoster" aria-label="Playground recording showing the GitHub request, paused updates, and dashboard preview after reconnecting">
      <source src="/workshop/playground-preview.mp4" type="video/mp4" />
    </SlidevVideo>
  </div>
</div>

<!--
2:00–4:00

Read the prompt as the playground recording starts. Send starts the request. Pause updates simulates a dropped stream. When the browser reconnects, the dashboard appears. Now imagine closing the tab before approval. Give people a few seconds to predict what they’ll find when they return. Keep the question open. First follow what the server does after Send, then look at where the draft waits for a decision.
-->

---

# What is LangGraph.js?

<p class="slide-lead">A TypeScript library for building workflows.</p>

<div class="flow" role="group" aria-label="Dashboard workflow">
  <div><strong>Read GitHub</strong></div>
  <span aria-hidden="true">→</span>
  <div><strong>Build dashboard</strong></div>
  <span aria-hidden="true">→</span>
  <div><strong>Wait for review</strong></div>
</div>

<div class="terms">
  <div><strong>Node</strong><span>A step</span></div>
  <div><strong>Edge</strong><span>Where to go next</span></div>
  <div><strong>State</strong><span>Data each step can use</span></div>
</div>

<!--
4:00–7:00

The workflow starts by looking up public GitHub facts. Turn the facts into a dashboard. Hold the draft for a human decision. Point to a box for a node and an arrow for an edge. State carries what later steps need, including the dashboard. The diagram simplifies the flow. In the source, a small lookup graph runs during the dashboard update node. Ask who decides which GitHub lookup to run.

https://docs.langchain.com/oss/javascript/langgraph/graph-api
-->

---

# Gemini on Vertex AI drafts the dashboard

<div class="flow draft-flow" role="group" aria-label="From GitHub lookup to dashboard">
  <div><strong>Gemini asks for GitHub data</strong><span><code>get_github_repository</code></span></div>
  <span aria-hidden="true">→</span>
  <div><strong>LangGraph reads GitHub</strong><span>Description · Stars · Forks</span></div>
  <span class="draft-next" aria-hidden="true">↓</span>
  <div class="draft-output">Gemini returns <strong>A2UI JSON</strong> and Angular renders it as the dashboard.</div>
</div>

```ts
.addNode("tools", new ToolNode(githubTools))
.addConditionalEdges("selectTools", toolsCondition, ["tools", END])
```

<!--
7:00–10:00

Read the opening prompt. Gemini 3.5 Flash-Lite on Vertex AI can request get_github_repository with owner and name both set to “skein-js”. Point to toolsCondition. It sees the tool call and routes to ToolNode, which reads GitHub. With no tool call, END finishes the lookup subgraph. For example, “Build me a dashboard” can lead to a follow-up asking which repository the user meant. Gemini uses the facts to generate Agent-to-UI (A2UI) JSON describing the dashboard’s components and data. Angular renders the dashboard from that description. The graph validates and saves the draft before review. What lets the browser find it again?

https://docs.langchain.com/oss/javascript/integrations/chat/google
https://github.com/skein-js/skein-js/blob/1b1a4d4018d1dad718054cd4f71d65f582e653a2/examples/github-playground/src/index.ts
-->

---

# The same URL opens the same chat

<div class="terms">
  <div><strong>Thread</strong><span>The chat and its saved work</span></div>
  <div><strong>Run</strong><span>One job for the agent</span></div>
  <div><strong>Checkpoint</strong><span>Work saved at a step</span></div>
</div>

<p class="callout"><code>?thread=…</code> <span aria-hidden="true">→</span> Original prompt · Saved draft · Pending review</p>

<!--
10:00–12:30

The thread brings together the earlier GitHub request and its workflow state. A run is one execution, such as drafting a dashboard. A checkpoint records what the workflow saved at a step. The thread ID in the URL is our reference back. Skein uses it to load the latest checkpoint, so the app can restore the original prompt, saved draft, and pending review. After approval, “Show forks before stars” can start another run on the same thread. The graph passes the saved dashboard to Gemini as context. Ask what happens if you select New chat. The app starts a different thread with the next request.

https://docs.langchain.com/oss/javascript/langgraph/persistence
https://skein.js.org/threads
-->

---

# The agent waits for your approval

<div class="flow" role="group" aria-label="Human approval workflow">
  <div><strong>Save the draft</strong></div>
  <span aria-hidden="true">→</span>
  <div><strong>Wait for approval</strong></div>
  <span aria-hidden="true">→</span>
  <div><strong>Record the decision</strong></div>
</div>

```ts
const decision = decisionSchema.parse(
  interrupt({ kind: "review-ui", generationId: state.ui.generationId })
)
```

<!--
12:30–15:00

The update node checkpoints the validated dashboard. The review node calls interrupt and waits for you. Approve UI sends a resume command on the original thread. The review node checks that the decision belongs to this version and records it. A resume can start a new run on the same thread. The node runs again on resume, so any side effect before interrupt needs replay protection. This example records a review decision and uses read-only GitHub tools. From the browser, we still need a service that can find the right thread and deliver that decision.

https://docs.langchain.com/oss/javascript/langgraph/interrupts
https://github.com/skein-js/skein-js/blob/1b1a4d4018d1dad718054cd4f71d65f582e653a2/examples/a2ui/src/ui-graph.ts
-->

---

# Why put the agent on a server?

<div class="comparison">
  <div><h2>Local script</h2><p>Run <span aria-hidden="true">→</span> Print a result</p></div>
  <div><h2>Web app</h2><p>Send <span aria-hidden="true">→</span> Watch <span aria-hidden="true">→</span> Reopen</p></div>
</div>

<!--
15:00–17:00

The script can print a dashboard while you wait. Walk the web app through starting work, following its progress, and coming back later. “Where is my review?” requires routes for finding runs, a worker, and a database the app can reach later. You can build that service, use a managed one, or host a runtime yourself. I wanted to keep the TypeScript graph and compatible client while choosing where it runs.
-->

---

# What is skein-js?

<div class="split runtime">
  <div>
    <div class="brand"><img src="/skein-knot.svg" alt="" /> <span>Hosts your LangGraph.js agent</span></div>
    <figure class="building-blocks">
      <video controls playsinline preload="none" src="/workshop/skein-building-blocks.mp4" poster="/workshop/images/building-blocks.png" aria-label="Skein building blocks, illustrated with a weather request"></video>
      <figcaption><a href="./workshop/index.html#building-blocks">Weather example</a> · 14 seconds</figcaption>
    </figure>
  </div>
  <div class="runtime-diagram" role="group" aria-label="Skein runtime layers">
    <div><strong>Browser</strong></div>
    <span aria-hidden="true">↕</span>
    <div class="runtime-boundary"><strong>skein-js</strong><span>Start runs · Send updates · Save progress</span><div class="graph"><strong>LangGraph.js</strong><span>Runs the workflow</span></div></div>
    <span aria-hidden="true">↕</span>
    <div><strong>Vertex AI · GitHub</strong></div>
  </div>
</div>

<!--
17:00–20:00

I built skein-js because I wanted to host a TypeScript graph I already had. It’s an open-source TypeScript runtime. LangGraph.js runs the workflow and defines where it pauses. Skein starts runs, sends progress to the browser, and brings back saved work. Its Agent Protocol API also lets compatible clients talk to it. When you host it yourself, you manage identity, infrastructure, and operations. Play the weather example if time allows. It uses the same parts with a different tool.

https://skein.js.org/
https://skein.js.org/building-blocks
-->

---

# Tell Skein which graph to run

<div class="flow" role="group" aria-label="Graph registration">
  <div><strong><code>skein dev</code></strong></div>
  <span aria-hidden="true">→</span>
  <div><strong><code>langgraph.json</code></strong></div>
  <span aria-hidden="true">→</span>
  <div><strong><code>ui-playground</code></strong></div>
</div>

```json
{
  "graphs": {
    "ui-playground": "./src/live-graph.ts:graph"
  }
}
```

<!--
20:00–22:00

Start with the command students will run locally. Skein reads langgraph.json and loads the TypeScript export. This is the mapping from the example with the other fields omitted. The key, ui-playground, is the name the client passes to start a run. The compatibility matrix lists supported CLI and API features. The hosted demo uses skein build and skein start.

https://skein.js.org/langgraph-cli-compat
https://github.com/skein-js/skein-js/blob/1b1a4d4018d1dad718054cd4f71d65f582e653a2/examples/a2ui/langgraph.json
-->

---

# The agent can keep working

<div class="timeline" role="group" aria-label="Browser stream and background run">
  <div><strong>Send</strong><span>Start a run</span></div>
  <div><strong>Watch</strong><span>Live updates</span></div>
  <div><strong>Pause updates</strong><span>Stop watching</span></div>
  <div><strong>Reconnect</strong><span>See the latest progress</span></div>
  <div class="run-track"><strong>Work can continue on the server</strong><span aria-hidden="true"></span></div>
</div>

<p class="callout">What does <strong>Stop run</strong> do?</p>

<!--
22:00–25:00

Return to the dropped connection from the opening. The client starts a background run. The browser follows it over server-sent events (SSE). Pause updates closes the browser’s stream. Follow the line beneath it. The worker can keep building the dashboard. Reconnect rejoins the active run or reloads saved state. Give attendees a moment to answer the question. Stop run requests cancellation. In a hosted service, the browser and the container can both disappear. Ask what should live outside the container.

https://skein.js.org/streaming
https://skein.js.org/background-jobs
-->

---

# Where the demo runs

<div class="cloud-diagram" role="group" aria-label="The demo’s Google Cloud architecture">
  <div class="cloud-tier"><strong>Browser</strong><span>Angular · A2UI</span></div>
  <span class="cloud-arrow" aria-hidden="true">↕</span>
  <div class="cloud-tier cloud-boundary"><strong>Cloud Run</strong><span>Web app · Skein · LangGraph.js</span></div>
  <span class="cloud-arrow" aria-hidden="true">↕</span>
  <div class="cloud-services">
    <div class="cloud-tier"><strong>Vertex AI</strong><span>Gemini 3.5 Flash-Lite</span></div>
    <div class="cloud-tier"><strong>Cloud SQL for PostgreSQL</strong><span>Saved chats · Drafts · Approvals</span></div>
    <div class="cloud-tier"><strong>Memorystore for Redis</strong><span>Queued work · Live updates</span></div>
  </div>
</div>

<!--
25:00–29:00

Start with the browser. Cloud Run serves the frontend and proxy and hosts the Skein worker that executes the graph. The worker uses its service account to call Gemini on Vertex AI for tool selection and drafting. Cloud SQL for PostgreSQL stores threads, run records, and checkpoints containing the dashboard and pending approval. Memorystore for Redis carries the run queue and live events. The container can be replaced while those services stay available. The deployment attaches Cloud SQL and uses private VPC egress for Redis. Secret Manager supplies both connection strings. Ask which service the replacement instance reads to find the pending review.

https://skein.js.org/deploy-cloud-run
https://docs.cloud.google.com/run/docs/securing/service-identity
https://docs.cloud.google.com/sql/docs/postgres/connect-run
https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance-cloud-run
https://docs.cloud.google.com/run/docs/deploying#sidecars
-->

---

# Keep the agent working on Cloud Run

<div class="terms term-stack">
  <div><strong>CPU</strong><span>Keep it available between requests</span></div>
  <div><strong>Concurrency</strong><span>Set separate limits for requests and runs</span></div>
  <div><strong>Timeout</strong><span>Reconnect when the connection closes</span></div>
</div>

<p class="callout">In rehearsal, a new deployment opened the same draft.</p>

<p><Link to="cloud-setup">Cloud Run deployment guide</Link></p>

<!--
29:00–33:00

The browser can start a run and get a response while the work is still in Redis. Keep CPU available between requests with instance-based billing and a warm instance. The warm instance costs money and can still be replaced. Limit HTTP requests and worker runs separately, and leave room for Cloud SQL connections as instances scale. If a stream times out, reconnect or load the saved draft. In rehearsal, a new revision opened the draft from Cloud SQL and completed approval without asking Gemini to generate it again. A model call can still fail during replacement. If you retry work that changes something outside the app, plan how to avoid doing it twice. Point to the deployment guide.

https://docs.cloud.google.com/run/docs/configuring/billing-settings
https://docs.cloud.google.com/run/docs/about-concurrency
https://docs.cloud.google.com/run/docs/configuring/request-timeout
https://skein.js.org/deploy-cloud-run
-->

---

# The dashboard is ready to approve

<div class="split dashboard-demo">
  <div class="dashboard-steps">
    <strong>A2UI JSON</strong>
    <span aria-hidden="true">↓</span>
    <strong>Dashboard in Angular</strong>
    <p class="callout"><strong>Approve UI</strong></p>
  </div>
  <img src="/workshop/images/review.jpg" alt="The validated GitHub dashboard in the A2UI playground with the app’s Approve UI control" />
</div>

<!--
33:00–35:00

Start at the Generated JSON panel. The model drafts these A2UI messages and the graph validates the draft before saving it. Angular renders the messages with its registered components. Point out the description, stars, and forks in the live demo. Point to Approve UI in the screenshot. The app supplies that control and the graph records the review. Can you get back to this exact draft after you stop watching?

https://skein.js.org/recipes/a2ui
-->

---

# Open the same chat again

<div class="split live-exercise">
  <ol>
    <li>Send the prompt</li>
    <li><strong>Pause updates</strong> <span aria-hidden="true">→</span> <strong>Reconnect</strong></li>
    <li>Close the tab <span aria-hidden="true">→</span> Open the same link</li>
    <li><strong>Approve UI</strong></li>
  </ol>
  <div class="replay-frames">
    <img v-click.hide="1" src="/workshop/images/stream.jpg" alt="The preview streams after sending the prompt" />
    <img v-click="[1, 2]" src="/workshop/images/review.jpg" alt="The saved dashboard returns with approval pending" />
    <img v-click="2" src="/workshop/images/approved.jpg" alt="The app confirms approval of the saved dashboard" />
  </div>
</div>

<p><a href="./workshop/index.html">Open the workshop replay</a></p>

<!--
35:00–41:00

Start a fresh thread in the authenticated deployment and send the opening prompt. As soon as the preview starts, pause updates. The browser stops listening while Skein’s worker can keep running the graph. Reconnect and wait for Approve UI. If generation already finished, continue from review and show the stream controls in the replay. Copy the thread URL, close the tab, and reopen that URL. [Click to show the restored draft.] Point to the same dashboard and the same pending decision. Skein used the thread ID to load the Cloud SQL checkpoint. Select Approve UI. [Click to show the approval.] LangGraph resumes the paused review and records the decision. Show the confirmation. The screenshots on this slide use sample data. Use them or open the replay if the live service fails.
-->

---

<div class="end-frame">
  <div class="end-card">
    <div>
      <h1>Try the dashboard demo</h1>
      <p>Watch the replay or run it on your machine.</p>
      <nav class="speaker-socials" aria-label="Maina Wycliffe’s profiles and company website">
        <a href="https://github.com/mainawycliffe">GitHub @mainawycliffe</a>
        <a href="https://www.linkedin.com/in/mainawycliffe/">LinkedIn @mainawycliffe</a>
        <a href="https://x.com/_mainawycliffe">X @_mainawycliffe</a>
        <a href="https://garatropic.com/">garatropic.com</a>
      </nav>
    </div>
    <figure class="qr-block">
      <img src="/workshop-qr.png" alt="QR code linking to the DevFest Lusaka workshop materials" />
      <figcaption><a href="./workshop/index.html">Open the workshop</a></figcaption>
    </figure>
  </div>
</div>

<!--
41:00–45:00

Give attendees time to scan the link. They can watch the two-minute replay in a browser without an account. In the local lab, they’ll run the TypeScript example, reopen the same draft after restarting the server, and try a follow-up in the same chat. Ask what work their own users should be able to return to. Leave this slide visible for Q&A.
-->

---
routeAlias: cloud-setup
---

# Deploy Skein on Cloud Run

<div class="split deployment-resource">
  <div>
    <div class="brand">
      <img src="/skein-knot.svg" alt="" />
      <a href="https://skein.js.org/deploy-cloud-run">skein.js.org/deploy-cloud-run</a>
    </div>
    <p class="slide-lead">Build the image · Add Postgres and Redis · Test a run</p>
  </div>
  <figure class="qr-block">
    <img src="/deck-qr.png" alt="QR code linking to the published DevFest Lusaka workshop slides" />
    <figcaption><a href="https://decks.mainawycliffe.dev/devfest-lusaka-2026/">Open these slides</a></figcaption>
  </figure>
</div>

<!--
Appendix

Share the Skein deployment guide. It covers building the image, connecting Postgres and Redis, and testing a background run on Cloud Run. Use the QR code to share this deck. The workshop demo’s Angular container and Vertex AI configuration are in the presenter runbook.

https://skein.js.org/deploy-cloud-run
-->
