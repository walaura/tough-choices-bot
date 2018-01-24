const config = require('./.pancakerc');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
	entry: {
		app: 'app'
	},
	plugins: [
		new CleanWebpackPlugin(
			[config.paths.build]
		),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: [/node_modules/]
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			minify: {
				collapseWhitespace: true
			},
			template: path.join('etc','bot.template.ejs'),
			filename: `${config.filenames.base}.html`,
		}),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			minify: {
				collapseWhitespace: true
			},
			template: path.join('etc','bot.template.ejs'),
			filename: path.join('..',config.paths.build,config.filenames.test+'.html'),
			test: true,
			base: `file://${__dirname}/${config.paths.build}/${config.filenames.base}.html`
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname,'src','post')
				],
				use: ExtractTextPlugin.extract([
					'css-loader?modules&importLoaders=1&localIdentName=tc-[hash:base64:10]',
					'./'+config.paths.tools+'/randomCssLoader'
				])
			},
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader',
					options: { limit: 10 }
				}],
			},
			{
				test: /\.txt$/,
				use: ['raw-loader']
			},
			{
				test: /\.yaml$/,
				use: ['yaml-loader']
			},
			{
				test: /\.css$/,
				exclude: [
					/node_modules/,
					path.resolve(__dirname, 'src','post')
				],
				use: ExtractTextPlugin.extract({
					use: ['css-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
				],
				use: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'post.js',
		path: path.resolve(__dirname, config.paths.build),
		library: 'Pancakes',
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'corpus': path.resolve(__dirname,'corpus'),
			'data': path.resolve(__dirname,'data')
		},
		modules: [
			path.resolve(__dirname,'src'),
			'node_modules'
		]
	}
};
