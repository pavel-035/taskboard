const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/',

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
        `
      }
    }
  }
})
