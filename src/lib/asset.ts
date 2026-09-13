/**
 * Resolves a file inside `public/assets` against the deploy base path,
 * so the same code works on localhost and on GitHub Pages.
 */
export function asset(file: string): string {
  return `${import.meta.env.BASE_URL}assets/${file}`
}
