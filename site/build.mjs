import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))
const site = join(repository, 'site')
const output = resolve(process.argv[2] ?? join(site, 'dist'))
const base = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '')
const decks = JSON.parse(await readFile(join(site, 'decks.json'), 'utf8'))

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function renderCard({ slug, title, subtitle, event, cover, pdf }) {
  const path = `./${slug}/`
  const image = cover ? `<img class="deck-cover" src="${path}${escape(cover)}" alt="">` : ''
  const download = pdf ? `<a href="${path}${escape(pdf)}">Download PDF</a>` : ''
  return `<li class="deck-card">
          ${image}
          <div class="deck-info">
            <p class="event">${escape(event)}</p>
            <h2><a href="${path}">${escape(title)}</a></h2>
            <p class="deck-subtitle">${escape(subtitle)}</p>
            <div class="deck-actions">
              <a class="open-slides" href="${path}" aria-label="Open slides for ${escape(title)}">Open slides</a>
              ${download}
            </div>
          </div>
        </li>`
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

const template = await readFile(join(site, 'index.html'), 'utf8')
await writeFile(join(output, 'index.html'), template.replace('<!-- DECKS -->', () => decks.map(renderCard).join('\n        ')))
await copyFile(join(site, 'styles.css'), join(output, 'styles.css'))
await writeFile(join(output, '.nojekyll'), '')
console.log(`Built ${decks.length} deck(s) in ${output}`)
