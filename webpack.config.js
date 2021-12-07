const PROJECT = require('./package.json')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    test: './src/index.js'
  },

  output: {
    clean: true,
    path: path.resolve(__dirname, 'build'),
    filename: `js/${PROJECT.name}.[name].js`,
    assetModuleFilename: 'img/[name][ext]'
  },

  optimization: {
    minimize: false
  },

  performance: {
    hints: false
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${PROJECT.name}.[name].css`
    }),
    new HtmlWebpackPlugin({
      title: `${PROJECT.name}: ${PROJECT.description}`,
      template: './template.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        use: 'svgo-loader'
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
                cleancss: false,
                compress: false,
                strictUnits: true,
                strictImports: false
              }
            }
          },
          {
            loader: 'style-resources-loader',
            options: {
              injector: 'append',
              patterns: [
                path.resolve('./src/less/settings/*.less'),
                path.resolve('./src/less/mixins/*.less')
              ]
            }
          }
        ]
      }
    ]
  }

  // devServer: {
  //   hot: true
  // }
}
