import path from 'path'
import { defineNuxtModule } from '@nuxt/kit'
import { getStaticRoutes } from './lib/router'
import { generateSiteMapXML } from './lib/generate'
export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/sitemap-plus',
    configKey: 'sitemap-plus',
    // compatibility: {
    //   // Semver version of supported nuxt versions
    //   nuxt: '>=3.0.0'
    // }
  },
  async setup(moduleOptions, nuxt) {
    const options = await initOptions(nuxt, moduleOptions)
    const xmlFilePath = path.join(nuxt.options.srcDir, `node_modules/.cache/.sitemap/${options.path}`)
    if (!options)
      return

    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      baseURL: '/',
      dir: path.dirname(xmlFilePath),
    })
    // Init static routes
    nuxt.hook('pages:extend', async (routes) => {
      const routerlist = getStaticRoutes(routes)
      await generateSiteMapXML(nuxt, routerlist, options)
    })
  },
})

async function initOptions(instance, moduleOptions) {
  if (instance.options.siteMap === false || moduleOptions === false)
    return false

  let options = instance.options.siteMap || moduleOptions

  if (options === 'function')
    options = await options.call(instance)

  if (options === false)
    return false

  return options
}
