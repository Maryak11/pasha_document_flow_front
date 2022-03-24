import { baseURL } from './plugins/api/instances';

export default {
  ssr: false,

  loadingIndicator: {
    name: 'fading-circle',
    color: '#9367C2',
    background: '#fbf7f7',
  },

  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['~/assets/css/globalStyles.css'],

  plugins: [
    '@/plugins/socket.client.js',

    '@/plugins/api/index.js',
    '@/plugins/filters.js',

    '@/plugins/prepareDescription.js',
    { src: '@/plugins/vuex-persist.js', ssr: false },

    '@/plugins/maska.js',
    '@/plugins/vuedraggable.js',
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  // publicRuntimeConfig: {
  //   yandexMetrika: {
  //     id: process.env.YANDEX_METRIKA_ID,
  //     // ...
  //   }
  // },

  auth: {
    plugins: ['~/plugins/api/index.js'],

    redirect: {
      login: '/',
      logout: '/',
      home: '/tasks',
    },

    strategies: {
      refresh: {
        token: {
          property: 'accessToken',
          global: true,
          required: true,
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          tokenRequired: true,
          maxAge: 30 * 24 * 60 * 60,
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        endpoints: {
          login: { url: baseURL + '/auth/login', method: 'post' },
          logout: { url: baseURL + '/auth/logout', method: 'post' },
          user: false,
          refresh: { url: baseURL + '/auth/refresh', method: 'post' },
        },
      },
    },
  },

  googleFonts: {
    download: true,
    families: {
      Manrope: [300, 400, 600, 700],
    },
  },
};
