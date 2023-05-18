

```shell
npm add stream-chunk-iter
yarn add stream-chunk-iter
pnpm add stream-chunk-iter
```


```javascript
const fs = require('node:fs')

const { blockIterator } = require("stream-chunk-iter");

for await(const data of blockIterator(fs.createReadStream('...'), 512)) {
  console.log(data.length);
}
```
