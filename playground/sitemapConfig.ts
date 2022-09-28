const config = {
  path: 'sitemap.xml',
  hostname: 'http://yuhepapernapkin.com/',
  cacheTime: 1000 * 60 * 60 * 24,
  gzip: true,
  generate: false,
  defaults: {
    changefreq: 'always',
    lastmod: new Date()
  },
  routes: [
    {
      url: '/',
      changefreq: 'always',
      lastmod: new Date()
    },
    {
      url: 'product/brand/3',
      changefreq: 'always',
      lastmod: new Date()
    },
    {
      url: '/home',
      changefreq: 'always',
      lastmod: new Date()
    }
  ]
}

export default config
