
import autoprefixer from 'autoprefixer'
import inlineSvg from 'postcss-inline-svg'
import url from 'postcss-url'

export default {
  plugins: [
    inlineSvg({
      paths: ['node_modules/@fortawesome/fontawesome-free/svgs/', 'node_modules', 'images']
    }),
    url({
      url: 'inline',
      maxSize: 10,
      optimizeSvgEncode: true
    }),
    autoprefixer
  ]
}
