# Invitación · Baby shower y revelación

Single-page invitation for Orlando & Mary, built with React + Vite and published
on GitHub Pages at <https://dkalvex.github.io/bbshower_invitacion/>.

## Development

```bash
npm install
npm run dev      # local server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Structure

```
public/assets/        images and the reveal video
src/components/       one component per section
src/hooks/            countdown timer and scroll-progress effect
src/lib/              countdown math and asset path helper
src/config.ts         RSVP destination (Google Form)
src/styles.css        design tokens and section styles
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. Enable it once in
**Settings → Pages → Source → GitHub Actions**.

The deploy path is hardcoded in `vite.config.ts` as `base: '/bbshower_invitacion/'`.
Change it if the repository is renamed or moved to a custom domain.

## Collecting RSVPs

GitHub Pages is static, so confirmations need an external collector. Until one is
configured, `src/config.ts` keeps `GOOGLE_FORM = null` and answers are stored only
in the visitor's own browser — meaning nobody receives them.

To receive them in a spreadsheet, create a Google Form and fill in:

```ts
export const GOOGLE_FORM: GoogleFormConfig | null = {
  action: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
  campos: {
    nombre: 'entry.111111',
    telefono: 'entry.222222',
    apuesta: 'entry.333333',
    mensaje: 'entry.444444',
  },
}
```

## Images

`public/assets/*.webp` is generated, not hand-edited. The full-size sources live
in `assets-src/` and `npm run images` rebuilds every `.webp` from them, resizing
each one to about twice its largest rendered size. `assets-src/` is versioned
because several files there — the lettering, the cropped balloons, the bears —
are edited artwork that exists nowhere else.

To change a target size, edit `TARGET_WIDTH` in `scripts/optimize-images.mjs`
and re-run the script.
