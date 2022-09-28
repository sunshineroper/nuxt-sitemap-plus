
import { getStaticRoutes } from './lib/router'
import { generateSiteMapXML } from './lib/generate'
import { defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/sitemap-plus',
    configKey: 'sitemap-plus'
    // compatibility: {
    //   // Semver version of supported nuxt versions
    //   nuxt: '>=3.0.0'
    // }
  },
  setup (moduleOptions, nuxt) {
    const options = initOptions(nuxt, moduleOptions)
    if (!options) {
      return
    }
    // Init static routes
    nuxt.hook('pages:extend', async routes => {
      const routerlist = await getStaticRoutes(routes)
      await generateSiteMapXML(nuxt, routerlist, options)
    })
  }
})

function initOptions (instance, moduleOptions) {
  if (instance.options.siteMap === false || moduleOptions === false) {
    return false
  }
  const options = instance.options.siteMap || moduleOptions
  return options
}
