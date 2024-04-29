// vite.config.js
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

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

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: entries,
      output: {
        dir: './dist/',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    sourcemap: true,
    publicPath: '',
    cssCodeSplit: true
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'strict',
        // plugins: [require('less-plugin-glob')],
        additionalData: `${globalLessVars}`
      }
    }
  }
})
