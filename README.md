# `nuxt-sitemap-plus`
sitemap generation for nuxt3

![npm version](https://img.shields.io/npm/v/nuxt-sitemap-plus)
![license](https://img.shields.io/npm/l/nuxt-sitemap-plus)
![downloads](https://img.shields.io/npm/dw/nuxt-sitemap-plus)
## Install

### Using `npm`
```sh
npm i nuxt-sitemap-plus -D
```
### Using `yarn`

```sh
yarn add nuxt-sitemap-plus -D
```

### Using `pnpm`

```sh
pnpm add nuxt-sitemap-plus -D
```
## Usage
2.Add a custom configuration with the sitemap property:
```js
// nuxt.config.js
import sitemapPlus from 'nuxt-sitemap-plus'
export default defineNuxtConfig({
  modules: [
    sitemapPlus
  ],
  siteMap: {
    // options
  },
})
```
2.build your nuxt app and see your sitemap file
```bash
npm run build
```
```bash
npx nuxi preview
```

In your browser go to `http://localhost:3000/sitemap.xml`
### Example
Please see playground
