const webpack = require('webpack')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const pkg = require('./package.json')
const LessPluginGlob = require('less-plugin-glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// ==================================

// group by folder, or by filetype
const groupOptions = {
  type: {
    js: `js/${pkg.name}.[name].js`,
    css: `css/${pkg.name}.[name].css`
  },
  folder: {
    js: `[name]/${pkg.name}.[name].js`,
    css: `[name]/${pkg.name}.[name].css`
  }
}

// choose one: type/bundle
const grouping = groupOptions['folder']

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
      filename: grouping.js
    }
    return result
  }, {}),

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  stats: 'errors-warnings',
  devtool: 'source-map',
  performance: {
    hints: false
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
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

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              svgo: false
            }
          ]
        }
      })
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
      filename: grouping.css
    })
  ]
}

module.exports = config
