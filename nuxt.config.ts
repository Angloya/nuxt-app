// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt"
  ],
  vite: {
    plugins: [
      svgLoader()
    ]
  }
});
