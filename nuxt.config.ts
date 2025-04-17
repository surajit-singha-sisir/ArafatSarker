export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,

  css: [
    '~/assets/styles/arafat-sarker.scss'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      titleTemplate: '%s',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/mastorscdn@2.0.1/mastors.min.css',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/surajit-singha-sisir/mastorsCDN@v1.1/mastorsIcons/mastorsIcons.css',
        }
      ]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  modules: ['@nuxt/image', '@nuxtjs/seo'],
  // plugins: ['kehem-tooltip'],
})