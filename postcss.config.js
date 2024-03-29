module.exports = {
  plugins: [
    require('postcss-inline-svg')({}),
    require('postcss-url')({
      url: 'inline',
      maxSize: 10,
      optimizeSvgEncode: true
    }),
    require('postcss-combine-media-query'),
    require('autoprefixer')
  ]
}
