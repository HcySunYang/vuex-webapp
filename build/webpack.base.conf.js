var path = require('path')

module.exports = {
    entry: {
        settings: path.resolve(__dirname, '../app/settings/settings.js'),
        // 公用模块
        vendors: [
            'vue',
            // 'zepto',
            'tool/lib/fastclick',
            'tool/widget/Util'
        ]
    },
    output: {
        // path: path.resolve(__dirname, '../dist/static'),
        // publicPath: 'static/',
        // filename: '[name].js'
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        root: [path.resolve(__dirname, '../node_modules')],
        alias:{
            components: path.resolve(__dirname, '../components'),
            static: path.resolve(__dirname, '../static'),
            app: path.resolve(__dirname, '../app'),
            tool: path.resolve(__dirname, '../tool')
        },
        extensions: ['', '.js', '.vue']
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules')
    },
    module: {
        preLoaders: [
            // {
            //     test: /\.vue$/,
            //     loader: 'eslint',
            //     exclude: /node_modules/
            // },
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    babel: {
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
}
