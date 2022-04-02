export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'do-it',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
       {
        rel: "preconnect", href:"https://fonts.googleapis.com",
        rel:"preconnect", href:"https://fonts.gstatic.com",
        href:"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap", rel:"stylesheet"
       }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vuelidate', mode: 'client' },
    { src: '~plugins/toast', mode: 'client' },
    { src: '~plugins/v-calendar', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCAUM5u2Uy_g073jpVliG0PKDitH-R13U4",
          authDomain: "do-it-9ade6.firebaseapp.com",
          databaseURL: "https://do-it-9ade6-default-rtdb.firebaseio.com",
          projectId: "do-it-9ade6",
          storageBucket: "do-it-9ade6.appspot.com",
          messagingSenderId: "633920591940",
          appId: "1:633920591940:web:5a77d0471047cfc96bc411",
          measurementId: "G-4JZ0THJMQD"
        },
        services: {
          auth: {
            persistence: 'local'
          },
          database: true,
          storage: true
        }
      }  
    ]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
