// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  modules: [
    'nuxt-monaco-editor','@element-plus/nuxt'
  ],

  runtimeConfig: {
    public: {
        apiKey: process.env.apiKey,
        authDomain:process.env.authDomain ,
        projectId:process.env.projectId ,
        storageBucket:process.env.storageBucket ,
        messagingSenderId:process.env.messagingSenderId ,
        appId:process.env.appId ,
    }
  }
})
