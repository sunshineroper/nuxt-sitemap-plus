export function flattenStaticRoutes (router, path:string = '', routes: string[] = []) {
  router.forEach((r) => {
    if ([':', '*'].some(v => r.path.includes(v))) { return }
    if (r.children && r.children.length > 0) {
      flattenStaticRoutes(r.children, path + r.path + '/', routes)
    }
    r.url = path.length && !r.path.length ? path.slice(0, -1) : path + r.path
    routes.push(r)
  })
  return routes
}
export function getStaticRoutes (router) {
  return flattenStaticRoutes(router)
}
