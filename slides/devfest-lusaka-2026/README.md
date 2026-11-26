# DevFest Lusaka 2026

**Beyond the Demo: Building Reliable AI Agents with Gemini and Cloud Run**

Maina Wycliffe presents a 45-minute guided workshop for beginner and intermediate developers. The goal is to deploy an AI agent that saves your work. Attendees follow a GitHub dashboard from a lost connection to reopening the same draft and approving it. The hosted demo uses Gemini on Vertex AI. Try the two-minute replay, then run the demo locally and make a dashboard of your own. [Workshop](public/workshop/index.html)

Use the organizer's speaker instructions for your slot and joining link. [DevFest Lusaka event listing](https://gdg.community.dev/events/details/google-gdg-lusaka-presents-devfest-lusaka-2026/)

## Present the deck

```sh
npm ci
npm run dev
```

Use Node 22.12 or newer for the slides. Open the URL Slidev prints for the audience and `/presenter` for the timed speaker notes. The playground clip plays when you reach slide 2. On slide 14, press Right to show the saved draft after reopening the chat, then the approval. The Skein slide includes the 14-second building-blocks animation. The README for the [private deployment](../../demos/devfest-lusaka-2026/README.md) records the runtime setup and rehearsal checklist.

The Cloud Run worker settings slide links to the deployment resource after the closing slide. [Skein Cloud Run deployment guide](https://skein.js.org/deploy-cloud-run)

## Demo cues

1. Open a fresh thread and send **Build a dashboard for skein-js/skein-js with its description, stars, and forks.**
2. Select **Pause updates** while the run is active. Ask whether the server can keep working after the browser stops listening. Select **Reconnect**. If the run reaches review first, continue there and use the replay to explain the stream controls.
3. Wait for **Approve UI**. Copy the thread URL, close the tab, and reopen the same URL. Show the saved dashboard and its pending approval.
4. Select **Approve UI** and show the confirmation. If the live model or connection fails, open the replay and use its labeled fixture captures. The replay and codelab work from the local deck server as well as the published deck.

The deck uses the [DevFest Kisumu Angular deck](../devfest-a2ui-2026/slides.md) as its visual reference, including the [DevFest 2026](https://developers.google.com/community/devfest/) hero photo and bracket artwork. The Conf42 graph and runtime illustrations inform the teaching diagrams. Dashboard captures are from the pinned GitHub example, using its deterministic test fixture. The workshop page includes Maina's building-blocks clip and a text summary.

## Share the workshop

The QR code on the deployment resource slide opens the [published deck](https://decks.mainawycliffe.dev/devfest-lusaka-2026/). The closing slide QR opens the [replay and codelab](https://decks.mainawycliffe.dev/devfest-lusaka-2026/workshop/).
