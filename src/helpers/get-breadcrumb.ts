export function getBreadcrumb(pathnames: string[], index: number) {
  const to = "/" + pathnames.slice(0, index + 1).join("/")
  const isLast = index === pathnames.length - 1

  return { to, isLast }
}

export function formatSegment(segment: string) {
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}