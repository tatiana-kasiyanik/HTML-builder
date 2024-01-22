const fsPromises = require('fs').promises;
const path = require('path');

fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

async function createHtml() {
  try {
    const template = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    let content = template;
    const components = await fsPromises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
    for (const component of components) {
      const extension = path.extname(component.name);
      if (component.isFile() && extension === '.html') {
        const tagName = component.name.slice(0, -5);
        const dataToReplace = await fsPromises.readFile(path.join(__dirname, 'components', component.name), 'utf-8');
        content = content.replace(`{{${tagName}}}`, dataToReplace);
      }
    }
    await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), content);
  }
  catch (err) {
    console.error(err.message);
  }
}

createHtml();

async function createCss() {
  try {
    const cssSrc = path.join(__dirname, 'project-dist', 'style.css');
    const stylesSrc = path.join(__dirname, 'styles');
    await fsPromises.rm(cssSrc, { recursive: true, force: true });

    const files = await fsPromises.readdir(stylesSrc, { withFileTypes: true });
    for (const file of files) {
      const extension = path.extname(file.name);
      if (file.isFile() && extension === '.css') {
        const dataToAppend = await fsPromises.readFile(path.join(stylesSrc, file.name), 'utf-8');
        await fsPromises.appendFile(cssSrc, `\n${dataToAppend}`);
      }
    }
  }
  catch (err) {
    console.error(err.message);
  }
}

createCss();

async function copyDirectory(dirSrc, dirDest) {
  try {
    await fsPromises.rm(dirDest, { recursive: true, force: true });
    await fsPromises.mkdir(dirDest, { recursive: true });

    const files = await fsPromises.readdir(dirSrc, { withFileTypes: true });
    for (const file of files) {
      const fileSrc = path.join(dirSrc, file.name);
      const fileDest = path.join(dirDest, file.name);
      if (file.isDirectory()) {
        await copyDirectory(fileSrc, fileDest);
      } else {
        await fsPromises.copyFile(fileSrc, fileDest);
      }
    }
  }
  catch (err) {
    console.error(err.message);
  }
}

const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(__dirname, 'project-dist', 'assets');
copyDirectory(assetsSrc, assetsDest);