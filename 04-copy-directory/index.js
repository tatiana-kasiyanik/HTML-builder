const fsPromises = require('fs').promises;
const path = require('path');

async function copyDirectory() {
  try {
    const srcDir = path.join(__dirname, 'files-copy');
    await fsPromises.rm(srcDir, { recursive: true, force: true });
    await fsPromises.mkdir(srcDir, { recursive: true });

    const files = await fsPromises.readdir(path.join(__dirname, 'files'));
    for (const file of files) {
      const src = path.join(__dirname, 'files', file);
      const dest = path.join(__dirname, 'files-copy', file);
      await fsPromises.copyFile(src, dest);
    }
  }
  catch (err) {
    console.error(err.message);
  }
}

copyDirectory();