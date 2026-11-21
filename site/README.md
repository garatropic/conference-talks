# Slide library

[Published slides](https://slides.mainawycliffe.dev/) are built from the entries in [decks.json](decks.json). To add a deck, put its Slidev project in `slides/<slug>/` and add an entry there. Set `cover` to a path inside that deck’s public directory. Set `pdf` to the filename of an export in `output/pdf/`. Both fields are optional.

Run `node site/build.mjs` from the repository root to build the whole site into `site/dist`. The folder contains the homepage at `index.html` and one subdirectory per deck, with its HTML, assets, and optional PDF. Pass a path to a new directory to build a second preview. Serve the whole folder with a static web server to check the index and deck links.

The [Publish slides workflow](../.github/workflows/slides-pages.yml) reads GitHub Pages’ base path, builds each deck without speaker notes, and deploys the generated index, decks, and selected PDFs.
