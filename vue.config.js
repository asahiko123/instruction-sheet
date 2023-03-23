const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: true
    }
  },
  outputDir: 'docs',
  assetsDir: './',
  publicPath: '/instruction-sheet/'
})
