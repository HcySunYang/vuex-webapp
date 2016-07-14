var path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	config = {},
	router = [];

router = [
	'settings'
];

config.devPlugins = [];
config.prodPlugins = [];

for(moduleName in router){
	config.devPlugins.push(new HtmlWebpackPlugin({
		filename: 'app/' + router[moduleName] + '/' + router[moduleName] + '.html',
        chunks: ['vendors', router[moduleName]],
        template: path.resolve(__dirname, '../app/' + router[moduleName] + '/' + router[moduleName] + '.html'),
        inject: true
	}));

	config.prodPlugins.push(new HtmlWebpackPlugin({
		filename: '../' + router[moduleName] + '.html',
        chunks: ['vendors', router[moduleName]],
        template: path.resolve(__dirname, '../app/' + router[moduleName] + '/' + router[moduleName] + '.html'),
        inject: true
	}));
}

module.exports = config;