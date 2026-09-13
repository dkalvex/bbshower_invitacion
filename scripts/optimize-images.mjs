/**
 * Rebuilds `public/assets/*.webp` from the full-size PNGs in `assets-src/`.
 *
 * Every target width is roughly twice the largest size the stylesheet ever
 * renders that image at, so the art stays crisp on retina screens without
 * shipping 2000px files for a 22px star.
 *
 * Run with: npm run images
 */
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'assets-src'
const OUTPUT_DIR = 'public/assets'
const QUALITY = 82

/** Target width in pixels, keyed by source file name. */
const TARGET_WIDTH = {
  'estrella.png': 160,
  'nube-ancha.png': 421,
  'nube-pequena.png': 396,
  'luna.png': 700,
  'oso-nino.png': 560,
  'oso-nina.png': 580,
  'globos-crop.png': 500,
  'nombres.png': 1000,
  'nino-o-nina.png': 1000,
  'club-nativos.png': 1000,
  'te-esperamos.png': 1000,
  'oso-lazo.png': 340,
  'coche.png': 620,
  'chupo.png': 400,
  'tetero.png': 280,
  'globo-aerostatico.png': 260,
  'foto-pareja.jpeg': 520,
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = (await readdir(SOURCE_DIR))
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .sort()
  const missing = files.filter((file) => !(file in TARGET_WIDTH))
  if (missing.length > 0) {
    throw new Error(`No target width configured for: ${missing.join(', ')}`)
  }

  let sourceBytes = 0
  let outputBytes = 0

  for (const file of files) {
    const source = join(SOURCE_DIR, file)
    const output = join(OUTPUT_DIR, `${parse(file).name}.webp`)

    await sharp(source)
      .resize({ width: TARGET_WIDTH[file], withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(output)

    const before = (await stat(source)).size
    const after = (await stat(output)).size
    sourceBytes += before
    outputBytes += after

    const saved = (100 - (after / before) * 100).toFixed(0)
    console.log(`${file.padEnd(24)} ${kb(before).padStart(9)} → ${kb(after).padStart(8)}  -${saved}%`)
  }

  const saved = (100 - (outputBytes / sourceBytes) * 100).toFixed(0)
  console.log(`\n${files.length} images: ${kb(sourceBytes)} → ${kb(outputBytes)} (-${saved}%)`)
}

await main()
