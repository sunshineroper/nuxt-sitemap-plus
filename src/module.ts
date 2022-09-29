
import { getStaticRoutes } from './lib/router'
import { generateSiteMapXML } from './lib/generate'
import { defineNuxtModule } from '@nuxt/kit'
const path = require('path')
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
    const xmlFilePath = path.join(nuxt.options.srcDir, `node_modules/.cache/.sitemap/${options.path}`)
    if (!options) {
      return
    }
    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      baseURL: '/',
      dir: path.dirname(xmlFilePath)
    })
    // Init static routes
    nuxt.hook('pages:extend', async routes => {
      const routerlist = getStaticRoutes(routes)
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
