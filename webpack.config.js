"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// const HOST = process.env.HOST || "localhost";
// const PORT = process.env.PORT || "8888";

const HOST = process.env.HOST || "162.243.253.203";
const PORT = process.env.PORT || "5000";

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style', 'css?sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded'),
	exclude: ['node_modules']
});

module.exports = {
	entry: [
		'./src/index.jsx', // your app's entry point
		'./styles/index.scss'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: false,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	    new ExtractTextPlugin("style.css", {
		  	allChunks: true
		}),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			files: {
				css: ['style.css'],
				js: [ "bundle.js"],
			}
		}),
		new FaviconsWebpackPlugin('./img/favicon.png'),
	]
};
