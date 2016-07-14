var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        index: path.resolve(__dirname, './sdk-entry.js')
    },
    output: {
        path: path.resolve(__dirname, '../../output/SDK'),
        publicPath: 'SDK/',
        filename: 'dmsdk.min.js',
        library: 'Dm',
        libraryTarget: 'umd'
    },
    resolve: {
        root: [path.resolve(__dirname, '../node_modules')],
        alias:{
            kerkee: path.resolve(__dirname, '../../kerkee.js'),
            clientApi: path.resolve(__dirname, '../../clientApi')
        },
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules')
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    babel: {
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
