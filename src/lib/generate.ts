import { Readable } from 'stream'
import { siteMapOptions } from './options'
const { createWriteStream, mkdirSync, writeFileSync } = require('fs')
const path = require('path')
const { SitemapStream, streamToPromise } = require('sitemap')

export function createSitemapConfig (options :siteMapOptions, routes: any[] = []) {
  routes = routes.map(r => ({ ...options.defaults, ...r }))
  const siteMapConfig = {
    hostname: options.hostname,
    routes
  }
  return siteMapConfig
}

export async function generateSiteMapXML (instance, router, options) {
  const siteMapConfig: siteMapOptions = createSitemapConfig(options, router)
  const xmlFilePath = path.join(instance.options.srcDir, `public/${options.path}`)

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: siteMapConfig.hostname })
  // Return a promise that resolves with your XML string
  const sitemap = await streamToPromise(Readable.from(siteMapConfig.routes).pipe(stream)).then(data =>
    data.toString()
  )
  // console.log(sitemap)
  mkdirSync(path.join(instance.options.srcDir, 'public'), { recursive: true })
  writeFileSync(xmlFilePath, sitemap)
}
