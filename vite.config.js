// vite.config.js
const fs = require('fs')
const path = require('path')

const { defineConfig } = require('vite')

function getEntries(dir, parent = '') {
  let entries = {}
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const newParent = parent ? `${parent}/${file}` : file
      entries = { ...entries, ...getEntries(fullPath, newParent) }
    } else if (file.endsWith('.library.js')) {
      console.log(parent)
      const name = `${path.basename(file, '.library.js')}`
      entries[name] = fullPath
    }
  }
  return entries
}

const componentsDir = path.resolve(__dirname, 'components')
const entries = getEntries(componentsDir)

function getLessImports(dir, parent = '') {
  let imports = ''
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const newParent = parent ? `${parent}/${file}` : file
      imports += getLessImports(fullPath, newParent)
    } else if (file.endsWith('.less')) {
      const importPath = `./less/${parent}/${file}`
      imports += `@import (reference) '${importPath}';\n`
    }
  }
  return imports
}

const lessDir = path.resolve(__dirname, 'less')
const globalLessVars = getLessImports(lessDir)

module.exports = defineConfig({
  // plugins: [vitePluginPostcss()],
  build: {
    rollupOptions: {
      input: entries,
      output: {
        dir: './dist/',
        entryFileNames: '[name]/[name].js',
        chunkFileNames: '[name]/[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    publicPath: './',
    cssCodeSplit: true
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `${globalLessVars}`
      }
    }
  }
})
