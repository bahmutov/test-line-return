```text
$ node .
```

```js
process.stdout.write('long message first')
process.stdout.write('short message')
process.stdout.write('\n')
```

```text
long message firstshort message
```

```js
process.stdout.write('long message first\n')
process.stdout.write('short message\n')
```

```text
long message first
short message
```

```js
process.stdout.write('long message first\r')
process.stdout.write('short message\n')
```

```text
short messagefirst
```

Hmm, need to clear the line. Let's use `process.stdout.columns` to know _how much to clear_.

```js
console.log('stdout width', process.stdout.columns)
const emptyLine = ''.padEnd(process.stdout.columns, ' ')
process.stdout.write('long message first\r')
// delay to better see the first message
setTimeout(() => {
  process.stdout.write(emptyLine + '\r')
  process.stdout.write('short message\n')
}, 1000)
```

```text
stdout width 99
long message first
# then a second later just
short message
```
