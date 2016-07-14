var webpack = require('webpack')
var config = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var KCconfig = require('./KCconfig')

// eval-source-map在开发阶段很快速
// config.devtool = 'eval-source-map'

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
    sourceMap: false,
    extract: false
}).forEach(function (loader) {
    config.vue.loaders[loader.key] = loader.value
})

// 向 entry chunks 添加 hot-reload 
var polyfill = 'eventsource-polyfill'
var devClient = './build/dev-client'
Object.keys(config.entry).forEach(function (name, i) {
    var extras = i === 0 ? [polyfill, devClient] : [devClient]
    // var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    
], KCconfig.devPlugins)

module.exports = config
