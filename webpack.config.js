// const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './js-src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  }
}
