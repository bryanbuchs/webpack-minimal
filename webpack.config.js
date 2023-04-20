// const webpack = require('webpack')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const LessPluginGlob = require('less-plugin-glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

// ==================================

const entryFiles = glob.sync('./src/**/index.js')

const removeEmptyFiles = () => {
  // get all build files from the dist folder, and if
  // they're empty, remove them
  const output = glob.sync('./dist/**/*.*')
  output.forEach(file => {
    fs.stat(file, (err, stats) => {
      if (err) {
        console.log('no file')
      } else if (!stats.size) {
        fs.unlinkSync(file)
      }
    })
  })
}

const config = {
  entry: entryFiles.reduce((result, el, i) => {
    const file = path.basename(el)
    const [key] = path.dirname(el).split('/').slice(-1)
    result[key] = {
      import: path.resolve(__dirname, el),
      filename: `js/[name].js` // // "js/first.js"
      // filename: `[name]/[name].js` // "first/first.js"
    }
    return result
  }, {}),

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'webpack-import-glob-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'strict',
                plugins: [LessPluginGlob]
              }
            }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, './less/settings/*.less'),
                path.resolve(__dirname, './less/mixins/*.less')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPluginNext({
      onAfterDone: {
        scripts: [removeEmptyFiles],
        blocking: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // css/first.css
      // filename: '[name]/[name].css' // first/first.css
    })
  ]
}

module.exports = config
