# Base Webpack Config

- `npm start` watches files for changes in `src`,  and compiles the results to `dist/`
- `npm run build` compiles and optimizes the output

## Build

* Webpack will look for `src/**/index.js` files and the results of each will be compiled to their own `dist` files. 
* The mixin and settings files in the root `less` directory are automatically loaded when processing LESS.
* Images smaller than 10kb referenced in CSS/LESS will be inlined as data-url in the compiled CSS.
* SVGs can be inlined the same way, or by using [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg) if fill/stroke colors need to be adjusted per-rule.
