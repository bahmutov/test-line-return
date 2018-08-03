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

## Docker

```docker
FROM node:8
COPY index.js .
RUN node .
```

```text
Status: Downloaded newer image for node:8
 ---> ed145ef978c4
Step 2/3 : COPY index.js .
 ---> 44db58d93738
Step 3/3 : RUN node .
 ---> Running in 1bc9d0e3b0d3
stdout width undefined
short messagefirst
Removing intermediate container 1bc9d0e3b0d3
 ---> cb8ac000c993
Successfully built cb8ac000c993
```

There is no `process.stdout.columns` number! So how do we show the second line? Well, we can take a shortcut and just do the "newline" instead!

```js
const emptyLine = process.stdout.columns ? ''.padEnd(process.stdout.columns, ' ') : '\n'
```

and it works nicely in the terminal and in Docker

```text
 ---> Running in 8d63833b96ac
stdout width undefined
long message first
short message
```

Nice, except when you have progress bars ... which output thousands of messages when showing percentage increments for example. In that case treat progress bars as _an enhancement_. By default only show text messages at the start and end of the action. If there is `process.stdout.columns` then you have a more capable terminal and you can render messages in place, and you can use progress indicators.
