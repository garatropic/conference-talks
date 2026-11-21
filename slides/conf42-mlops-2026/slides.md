---
theme: default
colorSchema: light
title: Your Agent Works. Will It Survive Tomorrow? Operating LangGraph.js with skein-js
author: Maina Wycliffe
fonts:
  provider: none
  sans: Arial
  mono: Menlo
---

<div class="event">Conf42 MLOps 2026</div>

# Your Agent Works.<br>Will It Survive Tomorrow?

<div class="subtitle">Operating LangGraph.js with skein-js</div>

<div class="speaker">
  <img src="/maina-conf42.webp" alt="Maina Wycliffe" />
  <div>
    <strong>Maina Wycliffe</strong><br>
    Founder &amp; Chief Builder at Garatropic
  </div>
</div>

<!--
0:00–2:00

A few months ago, I found LangGraph. I liked that I could see the steps my agent would take and where it could stop and wait. Then I found the CLI. We ran the graph locally, built a client against it, and had something I was excited to ship.

I’m Maina Wycliffe, founder and chief builder at Garatropic and a Google Developer Expert for Angular.

I’d been so focused on building that I hadn’t looked closely at the hosting terms. When we started planning deployment, I went looking for an open-source option I could run myself. I wanted to keep the graph and Agent Protocol. The client could start a run, follow it, and return to the same thread. I found a Python alternative and wondered what it would take to give TypeScript teams that choice.

Let me show what I mean by a graph, using the ticket we’ll come back to in the demo.
-->

---

# What is a LangGraph graph?

<p>Nodes do the work. Edges decide what runs next. State carries data between steps.</p>

<div class="flow" aria-label="Example support workflow: read a ticket, draft the reply, and pause for review">
  <div><strong>Read ticket</strong><span>Duplicate charge</span></div><span aria-hidden="true">→</span>
  <div><strong>Draft reply</strong><span>Propose a response</span></div><span aria-hidden="true">→</span>
  <div><strong>Wait for review</strong><span>Pause until a person responds</span></div>
</div>

<div class="steps">
  <div><small>Single step</small>Classify a ticket</div>
  <div><small>Branching workflow</small>Escalate billing issues</div>
  <div><small>Tool-using agent</small>Look up orders as needed</div>
</div>

<!--
2:00–3:00

A graph is how I write down the steps the application can take. A node does work. An edge says where to go next. State is what the next step can read: the ticket, the draft, or the outcome. This ticket flow is a simplified example.

A graph can be one step that classifies a ticket. It can branch according to rules, for example to send billing issues to a reviewer. A tool-using agent can loop: the model chooses a tool, reads the result, then decides whether to call another tool or finish. All three shapes can run in LangGraph.js. What changes when other people need to use the graph?
-->

---

# When does a graph need a backend?

<div class="comparison">
  <div><h2>Call the graph directly</h2><p>A script, an app that already handles execution, or a simple request that can wait for an answer.</p></div>
  <div><h2>Run the graph as a service</h2><p>Clients need to start work, follow it, and return later. Operators need to see what happened.</p></div>
</div>

<div class="rule">Use an existing backend, a managed service, or a self-hosted runtime.</div>

<!--
3:00–4:30

LangGraph.js already executes the graph. It also gives me primitives for checkpointing and interrupts. If I’m running a script or my app already handles everything the graph needs, calling the graph directly may be enough.

Say a customer submits a ticket and the agent drafts a reply. The reviewer says, “I’ll approve it tomorrow.” The service now has to give that work an identity, run it outside the request, persist the pause, and let someone find and resume it. I can build that around the graph in my own backend or choose a service that supplies it. I wanted a self-hosted option in TypeScript.
-->

---

# What is skein-js?

<div v-click class="runtime-overview">
  <div>
    <div class="brand"><img src="/skein-knot.svg" alt="" /> skein-js</div>
    <p>An Apache-2.0 TypeScript backend for the LangGraph.js project you already have.</p>
  </div>
  <div class="runtime-diagram">
    <div class="runtime-node"><strong>Your application</strong><span>LangGraph SDK · useStream</span></div>
    <div class="runtime-connection"><span aria-hidden="true">↕</span> Agent Protocol</div>
    <div class="runtime-backend">
      <div class="runtime-heading"><strong>skein-js</strong><span>Self-hosted backend</span></div>
      <div class="runtime-features"><span>API &amp; streaming</span><span>Persistence</span><span>Background jobs</span><span>Console</span></div>
      <div class="runtime-node"><strong>Your LangGraph.js agent</strong><span>Graph logic &amp; execution</span></div>
    </div>
    <div class="runtime-connection" aria-hidden="true">↓</div>
    <div class="runtime-node"><strong>Your models &amp; tools</strong><span>Chosen in your graph</span></div>
  </div>
</div>

<!--
4:30–6:00

[Reveal.] That’s why I built skein-js. LangGraph.js still executes my graph. skein-js gives the graph a backend with an Agent Protocol API, background jobs, persistence, streaming, and a console. I can keep my graph, models, tools, and compatible client.

Getting that backend onto an existing project was the first problem I wanted to solve. Here’s the config I wanted people to be able to keep.
-->

---

# The config you keep

```json
{
  "node_version": "24",
  "graphs": {
    "agent": "./src/graph.ts:graph"
  },
  "env": ".env"
}
```

<p><code>langgraph.json</code> maps <code>agent</code> to the <code>graph</code> export in <code>src/graph.ts</code>.</p>

<!--
6:00–6:45

This is the config from the TypeScript project I’ll use for the trial. The key agent is the name the client uses. The value points to the graph export in src/graph.ts. Both tools can read this file. Let’s start with what the LangGraph CLI already does.
-->

---

# Starting the LangGraph dev server

```sh
npx @langchain/langgraph-cli dev
```

<div class="flow" aria-label="The CLI reads the config, loads the graph, and starts a local API">
  <div><strong>Read config</strong><span><code>langgraph.json</code></span></div>
  <span aria-hidden="true">→</span>
  <div><strong>Load graph</strong><span><code>src/graph.ts</code></span></div>
  <span aria-hidden="true">→</span>
  <div><strong>Start local API</strong><span><code>127.0.0.1:2024</code></span></div>
</div>

[LangGraph local server docs](https://docs.langchain.com/oss/javascript/langgraph/local-server)

<!--
6:45–7:30

Run this from the project root. The CLI loads the graph and serves a local API. This is what I liked about it. I could work against my graph from a client without setting up routes myself. Now I’ll stop that server and start skein-js with the same project.
-->

---

# Trying skein-js on the same project

<div class="rule"><code>npm install -D skein-js</code></div>

<div class="steps command-steps">
  <div><small>Start</small><code>langgraph dev</code></div>
  <div v-click><small>Try skein-js</small><code>skein dev</code></div>
  <div v-click><small>Switch back</small><code>langgraph dev</code></div>
</div>

<div class="rule">Keep your config, graph, and SDK client.</div>

[LangGraph CLI compatibility matrix](https://skein.js.org/langgraph-cli-compat)

<!--
7:30–9:00

My goal was 100% compatibility with the LangGraph CLI. I wanted you to try skein-js on a project you already had. If it worked for you, keep going. If it didn’t, switch the command back.

[Reveal each command.] With both CLIs available, show the same SDK call against each development server on a fresh thread. Use the compatibility matrix to check the commands and config your project needs. This trial switches development servers. Evaluate production state migration separately.

That gets my existing graph running. I’d keep skein-js if it solved a problem I’d otherwise have to build around the graph. Let’s go back to the duplicate-charge ticket.
-->

---

# Try your graph in the console

<div class="console-preview">
  <div>
    <p><code>localhost:2024/console/</code></p>
    <ol>
      <li>Select a graph.</li>
      <li>Send a test input.</li>
      <li>Respond to a paused run.</li>
    </ol>
  </div>
  <figure>
    <img src="/skein-console-approval.png" alt="Skein Playground showing a paused run with a Waiting for you request and controls to resume it." />
    <figcaption><a href="https://skein.js.org/console">Example from the console guide</a></figcaption>
  </figure>
</div>

<!--
9:00–16:00

After skein dev, I can open the local console and try the graph I just started. This screenshot is a separate example from the docs. It shows what the Playground looks like when a graph asks a person for input. Now let’s see it with the duplicate-charge ticket from the opening. The agent drafts a reply, but the reviewer has gone home. Can they find the same draft tomorrow?

[Switch to the demo.] Submit the synthetic duplicate-charge ticket. Run the prepared retry and compare the returned run IDs. Both should point to the same work, so the reviewer has one draft to review. Open the pending draft in the skein-js console.

Restart only the skein-js app. Keep Postgres and Redis running and use the same graph version. When the app comes back, open the original thread, check that the draft is still pending, approve it, and show the recorded decision. The demo saves the decision locally. Sending a real customer reply would need its own protection against duplicate sends.

The reason I’d consider skein-js here is that the graph could pause and I could come back to a saved draft in the console. I didn’t have to build a separate service for background work and review. The console gave the reviewer a way back to the draft. Here are a few more things you can do once skein-js is running your graph.

[Use the rehearsed capture if needed. If a check fails, show what happened.]
-->

---

# What else can skein-js do?

<div class="comparison feature-grid">
  <div><h2>Reconnect to a run</h2><p>Join the live stream again after a refresh or disconnect.</p></div>
  <div><h2>Keep memory across threads</h2><p>Reuse a saved customer preference in a new conversation.</p></div>
  <div><h2>Fork from a checkpoint</h2><p>Try a different decision from a saved step and keep the original history.</p></div>
  <div><h2>Expose an assistant over MCP</h2><p>Let an authorized MCP client call it as a tool.</p></div>
</div>

[skein-js feature reference](https://skein.js.org/features)

<!--
16:00–17:30

The reviewer could return to a saved draft. A client can also reconnect to an active run and see new updates without submitting the work again. If the next ticket starts a new thread, the graph can look up a saved customer preference in the store. For testing, I can fork a checkpoint and run forward with a different decision. And if another app speaks MCP, I can expose an authorized assistant as a tool.

Those are options I can try with a graph I already have. The deployment I showed was a shared server. Here’s where else the same runtime fits.
-->

---

# Where skein-js runs

<div class="steps">
  <div><small>Shared server</small>Node or container<br>Postgres + Redis</div>
  <div><small>Existing backend</small>Embed alongside Express, Fastify, NestJS, or Next.js routes</div>
  <div><small>Local app</small>Desktop, CLI, or daemon<br>SQLite</div>
</div>

<!--
17:30–18:30

We just used skein-js as a shared service. That makes sense when a team shares an approval queue. If I already run a backend, I can mount skein-js alongside my routes. And if my user is running a desktop app or a CLI, I can keep the runtime and its state on their machine.
-->

---

# Run the agent inside a desktop app

<div class="flow" aria-label="A desktop UI calls a local skein-js backend that persists its state in SQLite">
  <div><strong>Desktop UI</strong><span>Electron or Tauri with a Node backend</span></div><span aria-hidden="true">→</span>
  <div><strong>Local skein-js</strong><span>Runs the graph on the device</span></div><span aria-hidden="true">→</span>
  <div><strong>SQLite</strong><span>Threads, queues, and checkpoints</span></div>
</div>

<div class="rule"><strong>Daybook</strong> Draft meeting follow-ups, close the app, and reopen the pending review later.</div>

[Desktop and SQLite guide](https://skein.js.org/local-deployment)

<!--
18:30–21:00

In the demo, the reviewer came back to a shared service. What if the person closes an app on their own laptop? Daybook, the Electron example in the repo, reads meeting context and prepares follow-ups. When the person reopens the app, SQLite lets them pick up the pending review. After approval, the app can save the follow-up locally. There’s also a Tauri example called Reading Room and a CLI example called Dayplan.

One Node process owns the SQLite file. A local model is an option if the app configures one. A graph that calls a cloud model still needs that connection. Now let’s look at a different way to start an agent run.
-->

---

# A channel can start and resume work

<div class="flow channel-flow" aria-label="An emailed refund request starts a graph, WhatsApp approval resumes it, and the decision goes back by email">
  <div><strong>Email</strong><span>Refund request</span></div><span aria-hidden="true">→</span>
  <div><strong>LangGraph</strong><span>Pause for review</span></div><span aria-hidden="true">→</span>
  <div><strong>WhatsApp</strong><span>Reviewer replies</span></div><span aria-hidden="true">→</span>
  <div><strong>Email</strong><span>Send the decision</span></div>
</div>

<div class="comparison">
  <div><h2>Your adapter</h2><p>Verify events and call each provider.</p></div>
  <div><h2>skein-js</h2><p>Deduplicate events, coordinate runs, and retry delivery.</p></div>
</div>

[Email-to-WhatsApp recipe](https://skein.js.org/recipes/decoupled-channel-delivery)

<!--
21:00–24:00

Here’s a documented example with the same idea as T-042. A customer emails about a duplicate charge. This time the reviewer can approve it in WhatsApp, where they already work. A verified reply resumes the graph, and the customer gets the decision by email.

You write the provider adapters and configure the allowed destinations. skein-js handles repeat inbound events, coordinates the thread and run, and retries outbound delivery. That means I can build the approval process around tools the team already uses. If my system only needs to kick off work and get the result, I can use a simpler path.
-->

---

# Schedule a run and get the result

<div class="flow" aria-label="A scheduled run checks the ticket queue and reports its result by webhook">
  <div><strong>Cron</strong><span>Check tickets every morning</span></div><span aria-hidden="true">→</span>
  <div><strong>Background run</strong><span>Process the queue</span></div><span aria-hidden="true">→</span>
  <div><strong>Webhook</strong><span>Notify the support system</span></div>
</div>

<div class="rule">Inspect delivery attempts in the console and replay a failed delivery.</div>

[Background jobs](https://skein.js.org/background-jobs) · [Run-completion webhooks](https://skein.js.org/webhooks)

<!--
24:00–26:00

The triage example in the repo can sweep the queue on a schedule. A caller can also submit a background run and get its ID back without holding the connection open. A completion webhook can tell the caller when it’s done. skein-js can retry delivery, so receivers should deduplicate repeated callbacks. These are pieces I can reuse when my graph needs to work between requests.
-->

---

# What’s next for skein-js?

<div class="steps">
  <div><small>Compatibility</small>Test new LangGraph CLI and SDK versions</div>
  <div><small>Deployment</small>Test Bun and Deno deployments</div>
  <div><small>Operations</small>Better run search in the console</div>
</div>

<div class="rule">Report CLI or SDK compatibility issues.</div>

[Roadmap](https://skein.js.org/roadmap) · [CLI compatibility](https://skein.js.org/langgraph-cli-compat)

<!--
26:00–27:00

The original goal is still the first priority for me. I want a new team to try skein-js on a real LangGraph project and know which CLI and SDK features will work as those tools evolve.

I also want better validation for the Bun and Deno previews and better access to run search in the console. The roadmap tracks what’s available and where the gaps are. If your project hits a gap, tell me which command, config, or SDK call you needed.

If you’re deciding whether it’s worth trying today, start with what your graph needs from a backend.
-->

---

# Try skein-js with one workflow

<div class="closing-actions">
  <div>
    <div class="brand"><img src="/skein-knot.svg" alt="" /> skein-js</div>
    <div class="adoption-path">
      <strong>Already using LangGraph.js</strong>
      <code>npm install -D skein-js</code>
      <code>npx skein dev</code>
    </div>
    <div class="adoption-path">
      <strong>Starting a new project</strong>
      <code>npm create skein-js@latest my-agent</code>
    </div>
    <div class="links">
      <a href="https://skein.js.org/">Docs</a> · <a href="https://skein.js.org/langgraph-cli-compat">Compatibility</a> · <a href="https://github.com/skein-js/skein-js/issues">Give feedback</a>
    </div>
  </div>

<a class="star-link" href="https://github.com/skein-js/skein-js">
  <img src="/skein-github-qr.png" alt="QR code for github.com/skein-js/skein-js" />
  <strong>Star skein-js on GitHub</strong>
</a>
</div>

<!--
27:00–29:30

I built skein-js because I wanted to ship a LangGraph.js graph I already liked. If you have a graph, point skein-js at it. If you’re starting fresh, the scaffolder gives you an echo graph you can try without a model key. Pick one thing you’d need to ship: an approval that survives a restart, a workflow that starts from an event, or a graph that lives inside your desktop app. Try that path with your own project.

If you hit a gap, open an issue with the CLI command, SDK call, or setup you tried. A small reproduction helps me fix it. And if skein-js is useful to you, scan the code and star the repo on GitHub. [Hold for 10 seconds, then advance.]
-->

---

# Connect with me

<div class="speaker contact-speaker">
  <img src="/maina-conf42.webp" alt="" />
  <div>
    <strong>Maina Wycliffe</strong><br>
    Founder &amp; Chief Builder at Garatropic
  </div>
</div>

<div class="contact-links">
  <div><strong>Website</strong><a href="https://mainawycliffe.dev/">mainawycliffe.dev</a></div>
  <div><strong>LinkedIn</strong><a href="https://www.linkedin.com/in/mainawycliffe/">linkedin.com/in/mainawycliffe</a></div>
  <div><strong>Twitter</strong><a href="https://twitter.com/_mainawycliffe">@_mainawycliffe</a></div>
  <div><strong>Garatropic</strong><a href="https://garatropic.com/">garatropic.com</a></div>
</div>

<!--
29:30–30:00

I’m Maina Wycliffe from Garatropic. If you’re building agents in TypeScript, I’d like to hear what you’re working on. Thanks for watching. [Leave the slide visible through the end.]
-->
