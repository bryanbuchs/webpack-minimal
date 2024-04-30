// post-build.js

import fs from 'fs'
import path from 'path'

function isOnlyComments (content) {
  const noInlineComments = content.replace(/\/\/.*/g, '').trim()
  const noBlockComments = noInlineComments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
  return noBlockComments.length === 0
}

function removeCommentOnlyFiles (directory) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      removeCommentOnlyFiles(fullPath)
    } else if (fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      if (isOnlyComments(content)) {
        fs.unlinkSync(fullPath)
        // console.log(`Removed empty ${fullPath}`)
        // if (fs.existsSync(mapPath)) {
        //   fs.unlinkSync(mapPath)
        // }
      }
    }
  }
}

removeCommentOnlyFiles('./dist')
