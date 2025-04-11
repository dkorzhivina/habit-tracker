const { exec } = require('child_process');

console.log('Starting development server for design tests...');
console.log('Access the design test at: http://localhost:3000/design-test');

exec('npm start', { cwd: process.cwd() }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Server error: ${stderr}`);
    return;
  }
  console.log(`Server output: ${stdout}`);
});
