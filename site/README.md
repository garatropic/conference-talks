# Slide library

## Local Slidev workspace

Use Node 22.12 or newer. Install the workspace and deck dependencies from the repository root on first use.

```sh
npm ci && (
  for lockfile in slides/*/package-lock.json; do
    (cd "${lockfile%/package-lock.json}" && npm ci) || exit 1
  done
)
```

Run `npm run slides:dev` and open [the local homepage](http://localhost:3000/). Each deck needs `slides.md` and a `package.json` with a `dev` script. After adding a deck, install its dependencies and restart the workspace. To use a different homepage port, run `npm run slides:dev -- --port 3100`.

The workspace lists all local decks, including drafts. To set a thumbnail, export the first slide to `public/cover.png` inside its deck and set `seoMeta.ogImage` to `cover.png` in the deck frontmatter. Add a `date` in `YYYY-MM-DD` format when you have one to display.

## Published slide library

[Published slides](https://decks.mainawycliffe.dev/) are built from the entries in [decks.json](decks.json). To add a deck, put its Slidev project in `slides/<slug>/` and add an entry there. Set `cover` to a path inside that deck’s public directory. Set `pdf` to the filename of an export in `output/pdf/`. Both fields are optional.

Run `npm run slides:build` from the repository root to build the whole site into `site/dist`. The folder contains the homepage at `index.html` and one subdirectory per deck, with its HTML, assets, and optional PDF. Pass a fresh output path with `npm run slides:build -- /path/to/preview`. Serve the whole folder with a static web server to check the index and deck links.

The [Publish slides workflow](../.github/workflows/slides-pages.yml) reads GitHub Pages’ base path, builds each deck without speaker notes, and deploys the generated index, decks, and selected PDFs.
