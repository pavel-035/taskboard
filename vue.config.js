const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/taskboard/',

  chainWebpack: (config) => {
    config.module.rules.delete('svg')
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@/assets/styles/variables.scss" as *;
          @use "@/assets/styles/fonts.css" as *;
          @use "@/assets/styles/index.scss" as *;
        `
      }
    }
  }
})
