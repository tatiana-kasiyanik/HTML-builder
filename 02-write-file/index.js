const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const result = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hi, student! Please, write your text.\n');
stdin.on('data', data => {
  const text = data.toString().trim();
  if (text === 'exit') {
    stdout.write('Thanks, good luck!\n');
    exit();
  }
  result.write(data);
});

process.on('SIGINT', () => {
  stdout.write('\nThanks, good luck!\n');
  exit();
});