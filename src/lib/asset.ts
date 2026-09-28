/**
 * Prefix a /public path with the deploy base path (e.g. /julian-portfolio on GitHub Pages).
 * Next adds the base path to its own routes, but not to plain <img>/<video> or unoptimized images.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
