import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import { parse } from 'yaml'

const repository = fileURLToPath(new URL('../', import.meta.url))
const site = join(repository, 'site')
const output = resolve(process.argv[2] ?? join(site, 'dist'))
const base = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '')
const decks = JSON.parse(await readFile(join(site, 'decks.json'), 'utf8'))

async function readPublishedDeck({ slug, title, subtitle, event, cover, pdf }) {
  const source = await readFile(join(repository, 'slides', slug, 'slides.md'), 'utf8')
  const headmatter = source.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/)?.[1]
  const { author, date } = parse(headmatter ?? '') ?? {}
  return {
    path: slug,
    baseUrl: `${base}/`,
    category: event,
    pdf: pdf ? `./${slug}/${encodeURIComponent(pdf)}` : undefined,
    frontmatter: {
      title,
      author: typeof author === 'string' ? author : undefined,
      date: typeof date === 'string' ? date : undefined,
      info: [event, subtitle].filter(Boolean).join(' · '),
      seoMeta: { ogImage: cover },
    },
  }
}

const slugs = decks.map(deck => deck.slug)
if (new Set(slugs).size !== decks.length || slugs.some(slug => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
  throw new Error('Each published deck needs a unique URL slug.')
}

// Build into a fresh directory so removed decks cannot linger in the next deployment.
await mkdir(output)
for (const { slug, cover, pdf } of decks) {
  const workingDirectory = join(repository, 'slides', slug)
  const deckOutput = join(output, slug)
  const npmOptions = { cwd: workingDirectory, stdio: 'inherit' }
  if (!existsSync(join(workingDirectory, 'node_modules', '.bin', 'slidev'))) {
    execFileSync('npm', ['ci'], npmOptions)
  }
  execFileSync('npm', [
    'run', 'build', '--', '--without-notes', '--router-mode', 'hash',
    '--base', `${base}/${slug}/`, '--out', deckOutput,
  ], npmOptions)
  if (cover && !existsSync(join(deckOutput, cover))) {
    throw new Error(`Missing cover for ${slug}: ${cover}`)
  }
  if (pdf) {
    await copyFile(join(repository, 'output', 'pdf', pdf), join(deckOutput, pdf))
  }
}

const workspace = fileURLToPath(new URL('./src/preview/', import.meta.resolve('slidev-workspace/package.json')))
const gallery = {
  hero: {
    title: 'Talk slides',
    description: 'Interactive decks and PDF downloads from my talks.',
    siteUrl: 'https://mainawycliffe.dev/',
  },
  sidebar: { title: 'Maina Wycliffe' },
}
// Only the allowlisted deck summaries reach the gallery bundle.
const modules = new Map([
  ['\0slidev:config', gallery],
  ['\0slidev:content', await Promise.all(decks.map(readPublishedDeck))],
])

await build({
  configFile: false,
  root: workspace,
  base: `${base}/`,
  resolve: { alias: { '@': workspace } },
  build: { outDir: output, emptyOutDir: false },
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'published-slide-gallery',
      resolveId(id) {
        const virtualId = `\0${id}`
        if (modules.has(virtualId)) return virtualId
      },
      load(id) {
        if (modules.has(id)) return `export default ${JSON.stringify(modules.get(id))}`
      },
      transformIndexHtml(html) {
        return {
          html: html.replace('<title>Slidev Workspace</title>', '<title>Talk slides · Maina Wycliffe</title>'),
          tags: [
            { tag: 'meta', attrs: { name: 'description', content: 'Interactive talk slides and PDFs by Maina Wycliffe.' } },
            { tag: 'link', attrs: { rel: 'icon', href: `${base}/favicon.svg` } },
          ],
        }
      },
    },
  ],
})

await writeFile(join(output, '.nojekyll'), '')
console.log(`Built ${decks.length} deck(s) in ${output}`)
