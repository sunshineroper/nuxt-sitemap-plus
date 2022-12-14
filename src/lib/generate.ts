import { Readable } from 'stream'
import path from 'path'
import { createWriteStream, mkdirSync, writeFileSync } from 'fs'
import type { siteMapOptions } from './options'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SitemapStream, streamToPromise } = require('sitemap')

export function createSitemapConfig(options: siteMapOptions, routes: any[] = []) {
  routes = routes.map(r => ({ ...options.defaults, ...r }))
  const siteMapConfig = {
    hostname: options.hostname,
    routes,
  }
  return siteMapConfig
}

export async function generateSiteMapXML(instance, router, options) {
  const siteMapConfig: siteMapOptions = createSitemapConfig(options, router)
  const xmlFilePath = path.join(instance.options.srcDir, `node_modules/.cache/.sitemap/${options.path}`)

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: siteMapConfig.hostname })
  // Return a promise that resolves with your XML string
  const sitemap = await streamToPromise(Readable.from(siteMapConfig.routes).pipe(stream)).then(data =>
    data.toString(),
  )
  instance.options.nitro.publicAssets = instance.options.nitro.publicAssets || []
  instance.options.nitro.publicAssets.push({
    baseURL: '/',
    dir: path.dirname(xmlFilePath),
  })
  mkdirSync(path.dirname(xmlFilePath), { recursive: true })
  writeFileSync(xmlFilePath, sitemap)
}
