# Conf42 MLOps 2026

Draft recording deck for [Your Agent Works. Will It Survive Tomorrow?](https://www.conf42.com/MLOps_2026_Maina_Wycliffe_langgraph_skein_agent). Sixteen slides and 30 minutes of presenter notes.

## Run the deck

Use Node 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the URL printed by Slidev for the audience view. Open `/presenter` on a separate screen for timed notes. Press Right to advance through the reveals on slides 4 and 7. For a static build, run `npm run build`.

## Rehearse the demo

Use the skein-js source revision [68f0285](https://github.com/skein-js/skein-js/tree/68f02851e9895b1b861051459fbb4f222a9b7c92) as the rehearsal baseline. Rehearse in an isolated development environment using the repository’s pinned dependencies. Record the CLI, SDK, and runtime versions you actually use. The sequence below is a rehearsal plan.

1. **Slides 5–7.** Use [migrated-langgraph](https://github.com/skein-js/skein-js/tree/68f02851e9895b1b861051459fbb4f222a9b7c92/examples/migrated-langgraph). Start it with `langgraph dev`, stop it, run `skein dev`, then try `langgraph dev` again. Use the same SDK call and compare outputs on fresh threads. Keep the graph export and `langgraph.json` visible. Use the [CLI compatibility matrix](https://skein.js.org/langgraph-cli-compat) to establish command coverage.
2. **Slide 8.** Use [triage-agent](https://github.com/skein-js/skein-js/tree/68f02851e9895b1b861051459fbb4f222a9b7c92/examples/triage-agent) configured for [Postgres and Redis](https://skein.js.org/deploy). Leave `GOOGLE_API_KEY` unset for deterministic classification. Create a thread and send two identical background run requests on it with one fresh `Idempotency-Key`. Compare the returned run IDs. Open the console and verify the run is waiting for review.
3. **Continue the same demo.** Restart only the application while keeping Postgres and Redis running. For the generated Compose stack, restart the `app` service using the same Compose file and project. Reopen the same thread, confirm the draft is still pending, approve, and inspect the resumed run’s outcome. The example records the verdict and any proposed reply in its store.
4. **Before recording.** Capture a fallback clip only after the demo works. If a result differs, report what you observed. Rehearse the full 30 minutes, then check the recording for audio, pacing, and readable identifiers and links. Hold the skein-js slide for 10 seconds and scan the QR from a playback frame to confirm it opens the skein-js repository. Check the organizer’s upload instructions and submission window.

### Suggested fixture and SDK call

Run this from the example's environment with the server at port 2024. Use a fresh thread on each take and reuse the same key within the take. The fixture is synthetic.

```ts
import { Client } from "@langchain/langgraph-sdk"

const apiUrl = "http://127.0.0.1:2024"
const sdk = new Client({ apiUrl })
const thread = await sdk.threads.create()
const client = new Client({
  apiUrl,
  defaultHeaders: { "Idempotency-Key": "ticket:T-042" },
})

const request = {
  input: {
    item: {
      sourceId: "T-042",
      title: "Bug: duplicate charge",
      body: "A customer reports a duplicate charge. Please review the proposed response.",
      labels: ["bug"],
    },
  },
}
const original = await client.runs.create(thread.thread_id, "triage", request)
const retry = await client.runs.create(thread.thread_id, "triage", request)
console.log({
  threadId: thread.thread_id,
  originalRunId: original.run_id,
  retryRunId: retry.run_id,
})
```

## Asset sources

- The cover uses the [published Conf42 headshot](https://conf42.github.io/static/headshots/webp/Maina%20Wycliffe_mlops.webp).
- The project reveal and close use the [official skein-js knot](https://github.com/skein-js/skein-js/blob/68f02851e9895b1b861051459fbb4f222a9b7c92/docs/public/skein-knot.svg).
- The console slide uses the [approval example from the skein-js documentation](https://skein.js.org/console#time-travel).
