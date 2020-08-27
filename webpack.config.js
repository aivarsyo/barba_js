var PACKAGE = require('./package.json')
var version = PACKAGE.version

const path = require('path')

const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')



module.exports = {


    entry: './src/js/index.js',
	output: {
		filename: './assets/js/main.' + PACKAGE.version + '.js',
		path: path.resolve(__dirname, './dist')
    },


    module:{
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: './../../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'sass-loader',
						options: {
						}
					},
				],
			},

            {
				test: /\.(woff|woff2|eot|ttf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						useRelativePath: true,
						outputPath: "./assets/fonts/",
					}
				}]
            },
            


            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
						name: '[name].[ext]',
						useRelativePath: true,
						outputPath: "./assets/images",
					}
                  },
                ],
              }
        ]
    },
    
    

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),

        new MiniCssExtractPlugin({
			filename: './assets/css/[name].' + PACKAGE.version + '.css',
			chunkFilename: './assets/css/[id].[hash].css'
		}),
        
        new CleanWebpackPlugin()
    ]
}