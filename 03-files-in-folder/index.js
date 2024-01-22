const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const name = file.name;
      const extension = path.extname(name);
      fs.stat(path.join(__dirname, 'secret-folder', name), (err, stats) => {
        if (err) throw err;
        console.log(`${name.replace(extension, '')} - ${extension.slice(1)} - ${stats.size}b`);
      });
    }
  });
});