

```shell
npm add stream-chunk-iter
yarn add stream-chunk-iter
pnpm add stream-chunk-iter
```


```javascript
const fs = require('node:fs')

const { streamChunkIter } = require("stream-chunk-iter");

for await(const data of streamChunkIter(fs.createReadStream('...'), 512)) {
  console.log(data.length);
}
```
