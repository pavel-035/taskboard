const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,

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
          @import "@/assets/styles/variables.scss";
        `
      }
    }
  }
})
