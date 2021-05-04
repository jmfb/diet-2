const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProduction = process.argv[process.argv.indexOf('--node-env') + 1] === 'production';
const isDebug = !isProduction;
const isVerbose = process.env.VERBOSE === 'true';
const isTest = process.env.NODE_TEST === 'test';
const treatWarningsAsErrors = !process.argv.includes('--watch');

const buildDir = path.resolve(__dirname, '../server/wwwroot/dist');

module.exports = {
	mode: isDebug ? 'development' : 'production',
	entry: {
		'bundle': [
			'whatwg-fetch',
			'./src/index.tsx'
		]
	},
	output: {
		publicPath: '/dist/',
		path: buildDir,
		filename: '[name].js?[chunkhash]',
		chunkFilename: '[name].[id].js?[chunkhash]',
		pathinfo: isDebug
	},
	resolve: {
		alias: {
			'~': path.join(__dirname, 'src')
		},
		extensions: ['*', '.tsx', '.ts', '.jsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env', {
									...{ modules: isTest ? 'commonjs' : undefined },
									corejs: 3,
									targets: 'last 2 versions, >0.5% in US, not dead, ie 11',
									useBuiltIns: 'usage'
								}
							],
							'@babel/preset-react',
							'@babel/preset-typescript'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread',
							'babel-plugin-macros'
						],
						cacheDirectory: isDebug
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDebug,
							url: false,
							modules: {
								localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isDebug,
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: isTest ? '[name].css' : '[name].[contenthash].css' }),
		new EsLintPlugin({
			extensions: ['ts', 'tsx'],
			failOnWarning: treatWarningsAsErrors,
			exclude: [
				'node_modules'
			]
		}),
		new ForkTsCheckerWebpackPlugin(),
		...isTest ? [] : [
			new CleanWebpackPlugin(),
			new AssetsPlugin({ path: buildDir })
		]
	],
	cache: isDebug,
	stats: {
		colors: true,
		reasons: isDebug,
		hash: isVerbose,
		version: isVerbose,
		timings: true,
		chunks: isVerbose,
		chunkModules: isVerbose,
		cached: isVerbose,
		cachedAssets: isVerbose,
		children: isVerbose
	},
	optimization: {
		minimizer: [
			'...',
			...isProduction ? [new CssMinimizerWebpackPlugin()] : []
		]
	}
};
