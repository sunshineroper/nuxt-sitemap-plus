export interface siteMapOptions {
  path?: string
  hostname? : string,
  exclude? :string[],
  routes? :string[],
  lastmod?: undefined,
  defaults?: {}
}
const DEFAULT_NUXT_PUBLIC_PATH = 'public'
function initOptions (instance, options) {
  const defaults: siteMapOptions = {
    path: '/sitmap.xml',
    hostname: instance.options.build.publicPath !== 'DEFAULT_NUXT_PUBLIC_PATH' ? instance!.options.build.publicPath : undefined,
    lastmod: undefined
  }

  return defaults
}
