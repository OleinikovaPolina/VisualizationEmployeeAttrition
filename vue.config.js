const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://oleinikovapolina.github.io/VisualizationEmployeeAttrition/dist/'
    : '/',
  transpileDependencies: true,
})
