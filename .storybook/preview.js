// Drupal libs
// import 'jquery'
// import 'Drupal/misc/drupal.js'
// import 'Drupal/misc/drupal.init.js'
// import 'Drupal/misc/drupalSettingsLoader.js'
// import 'Drupal/modules/system/css/components/hidden.module.css'
// import 'Drupal/modules/system/css/components/js.module.css'
// import once from '@drupal/once'
// global.once = once

// global styles from our theme

// storybook previe
// import '../../../contrib/gin/dist/css/theme/variables.css'
// import '../../../contrib/gin/dist/css/theme/accent.css'
import './prevent-default.js'
import './preview.less'

export const parameters = {
  options: {
    storySort: {
      order: [
        'README',
        'Global',
        'Element',
        'Entity',
        'Media',
        'Paragraph',
        'Nav',
        'Block',
        'Region',
        'View',
      ]
    }
  },

  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#ffffff' },
      { name: 'theme-olive', value: '#707c36' },
      { name: 'theme-plum', value: '#620059' },
      { name: 'theme-lagunita', value: '#007c92' },
      { name: 'paragraph-shaded', value: '#f4f4f4' },
      { name: 'stone-light-75', value: '#dfdddd' },
      { name: 'region-footer', value: '#eae8e8' }
    ]
  },

  controls: { hideNoControlsWarning: true }
}

// const argTypes = {}
// const hideControls = [
//   'attributes',
//   'media',
//   'config',
//   'table',
//   'rows',
//   'cards',
//   'menu',
//   'image',
//   'video'
// ]
// hideControls.forEach((key) => {
//   argTypes[key] = {
//     table: {
//       disable: true
//     }
//   }
// })

// export { argTypes }

// export const decorators = [
//   (story) =>
//     `<div class="page-wrapper" style="background: transparent; min-height:unset;">${story()}</div>`
// ]
