function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function isCurrentPage(pathname: string, href: string): boolean {
  return withTrailingSlash(pathname) === withTrailingSlash(href);
}

/** True when `pathname` is `href` or a page beneath it. The home page only matches itself. */
export function isCurrentSection(pathname: string, href: string): boolean {
  const path = withTrailingSlash(pathname);
  const target = withTrailingSlash(href);
  return target === '/' ? path === '/' : path.startsWith(target);
}
