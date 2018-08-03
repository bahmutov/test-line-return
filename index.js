console.log('stdout width', process.stdout.columns)
const emptyLine = ''.padEnd(process.stdout.columns, ' ')
process.stdout.write('long message first\r')
setTimeout(() => {
  process.stdout.write(emptyLine + '\r')
  process.stdout.write('short message\n')
}, 1000)
