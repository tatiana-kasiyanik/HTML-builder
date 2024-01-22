const fs = require('fs');
const path = require('path');
const { stdout } = process;

const result = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
result.on('data', chunk => stdout.write(chunk));