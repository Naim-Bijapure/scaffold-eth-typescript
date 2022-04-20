// import { exec } from 'child_process';
// import watch from 'node-watch';

const watch = require('node-watch');
const { exec } = require('child_process');

const run = () => {
  console.log('🛠  Compiling & Deploying...');
  exec('yarn deploy', function (error, stdout, stderr) {
    console.log(stdout);
    if (error != null) console.log(error);
    if (stderr != null) console.log(stderr);
  });
};

console.log('🔬 Watching Contracts...');
watch('./contracts', { recursive: true }, function (evt, name) {
  console.log('%s changed.', name);
  run();
});
run();
