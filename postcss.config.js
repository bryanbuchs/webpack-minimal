module.exports = {
  plugins: [
    require('postcss-inline-svg')({
      paths: ['node_modules/@fortawesome/fontawesome-free/svgs/', 'node_modules', 'images']
    }),
    require('postcss-url')({
      url: 'inline',
      maxSize: 10,
      optimizeSvgEncode: true
    }),
    require('autoprefixer')
  ]
}
