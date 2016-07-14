var webpack = require('webpack')
var config = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var KCconfig = require('./KCconfig')

// 是否生成生产环境文件的 sourceMap
// 加速构建
var SOURCE_MAP = false

config.devtool = SOURCE_MAP ? 'source-map' : false

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
    sourceMap: SOURCE_MAP,
    extract: true
}).forEach(function (loader) {
    config.vue.loaders[loader.key] = loader.value
})

config.plugins = (config.plugins || []).concat([
    // 公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js'
        // children:  true,
        // minChunks: 2
    }),
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // 提取css为单文件
    new ExtractTextPlugin("../[name].[contenthash].css")
    
], KCconfig.prodPlugins)

module.exports = config
