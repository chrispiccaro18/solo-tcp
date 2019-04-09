const fs = require('fs');

let options = {
  encoding: 'utf8',
  highWaterMark: 16 * 1024
};

const myFirstStream = fs.createReadStream('./1_streams.md', options);
myFirstStream.on('data', data => console.log('chunk', data));

const mySecondStream = fs.createWriteStream('./my-second-stream');
const didItWrite = mySecondStream.write('hello?', err => {
  if(err) throw err;
});

console.log(didItWrite);

mySecondStream.on('error', err => {
  if(err) throw err;
});

const origLabStream = fs.createReadStream('./1_streams.md');
const copyLabStream = fs.createWriteStream('./1_streams-copy.md');
origLabStream.on('data', data => {
  copyLabStream.write(data);
});
origLabStream.on('end', () => {
  copyLabStream.end();
});

options = {
  flags: 'a',
  encoding: 'utf8',
  highWaterMark: 16 * 1024
};

const ws = fs.createWriteStream('./spot.json', options);
ws.write('{\n');
ws.write('  "name": "spot",\n');
ws.write('  "age": "5"\n');
ws.write('}\n');
ws.end(() => {
  console.log('finished writing spot');
});

const copy2LabStream = fs.createWriteStream('./1_streams-copy2.md');
origLabStream.pipe(copy2LabStream);
origLabStream.pipe(process.stdout);
origLabStream.on('end', () => {
  console.log('finished');
});
