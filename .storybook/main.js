const config = {
  stories: ['../components/**/*.stories.js'],
  staticDirs: ['../images'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls'
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {}
  },
  docs: {
    autodocs: false
  },
  // https://www.previousnext.com.au/blog/drupal-front-end-nirvana-vite-twig-and-storybook
  previewBody: body =>
`${body}
<script>
  window.Drupal = window.Drupal || {behaviors: {}};
  window.drupalSettings = Object.assign(window.drupalSettings || {}, {
    // Mock any drupalSettings your behaviors need here.
  });

  // Mock Drupal's once library too.
  window.once = (_, selector) => document.querySelectorAll(selector);
  document.addEventListener('DOMContentLoaded', () => {
    Object.entries(window.Drupal.behaviors).forEach(([key, object]) => object.attach(document));
  })
</script>
  `
}

export default config
