// Add this function to your build script
function removeEmptyFiles(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      removeEmptyFiles(fullPath);
    } else if (stat.size === 0) {
      fs.unlinkSync(fullPath);
    }
  }
}

// Call this function after your build process
removeEmptyFiles('./dist');