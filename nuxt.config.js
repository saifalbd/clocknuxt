const pkg = require('./package')



module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
 

 serverMiddleware: [
  // Will register redirect-ssl npm package
   '~/api/index' 

  
]
,




  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name:"language", content:"english" },
      {'http-equiv':'content-type', content:"text/html"},
      {name:"author", content:'saifal Rahman'},
      { name:"designer", content:'saifal Rahman'},
      { name:"publisher", content:'saifal Rahman'},
     // { 'http-equiv':"refresh" , content:"59"},
      {name:"copyright", content:'Copyright 2019'},
      {name:"reply-to", content:"saifalwebs@gmail.com"},
      {name:"distribution", content:"global"}
//https://gist.github.com/MicBrain/46a9723158307fd30db66a4b2af85411
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css' }
    ]
  ,

 
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  //  '~/assets/style/app.styl'
  '~/assets/css/style.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
    src:'@/plugins/vuetify',
    },
    
    {
      src:'~/plugins/helper/index.js'
    },
    {
      src:'~/plugins/location/index.js'
    },
    { src:'~/plugins/globalmeta/index.js'  }

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

extend (config, { isDev }) {
  if (isDev && process.client) {
  config.module.rules.push({
  enforce: 'pre',
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  exclude: /(node_modules)/
  })
  }
  }
  }
}
