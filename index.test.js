const stream = require("node:stream");

const {assert} = require('chai');  // Using Assert style
const {describe, it} = require("@jest/globals");

const {streamChunkIter} = require("./index.js");

describe('blockIterator', () => {
  it('should stream', async () => {
    const total = 1024 * 1024 * 16
    const b = Buffer.allocUnsafe(total)

    for (let i = 0; i < b.length; i++) {
      b[i - 1] = i % 256
    }

    // set a number can't be divided by total length
    const size = 29

    let i = 0
    for await(const data of streamChunkIter(stream.Readable.from(b), size)) {
      assert.equal(data.toString('base64'), b.subarray(size * i, size * (i + 1)).toString('base64'), `chunk ${i} mismatch content`)
      i++
    }

    assert.equal(i, Math.ceil(total / size))
  })
})
