const { exec } = require('child_process')

exec('cat *.js bad_file | wc -l', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
