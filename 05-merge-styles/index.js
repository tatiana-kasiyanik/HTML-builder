const fsPromises = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  try {
    const bundleSrc = path.join(__dirname, 'project-dist', 'bundle.css');
    const stylesSrc = path.join(__dirname, 'styles');
    await fsPromises.rm(bundleSrc, { recursive: true, force: true });

    const files = await fsPromises.readdir(stylesSrc, { withFileTypes: true });
    for (const file of files) {
      const extension = path.extname(file.name);
      if (file.isFile() && extension === '.css') {
        const dataToAppend = await fsPromises.readFile(path.join(stylesSrc, file.name), 'utf-8');
        await fsPromises.appendFile(bundleSrc, `\n${dataToAppend}`);
      }
    }
  }
  catch (err) {
    console.error(err.message);
  }
}

mergeStyles();