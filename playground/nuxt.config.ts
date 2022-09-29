import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../src/module'
import sitemapConfig from './sitemapConfig'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  siteMap: sitemapConfig
  // modules: ['~/modules/sitemap'],
  // sitemap: {
  //   hostname: 'https://127.0.0.1'
  // }
})
