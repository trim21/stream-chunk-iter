const {Readable, Transform} = require("node:stream");
const streamPromise = require("node:stream/promises");

const benny = require('benny');
const blockStream = require('block-stream2');

const {blockIterator, blockIterator2} = require("./index");

benny.suite(
  "bench",

  benny.add("iter", async () => {
    const b = Buffer.allocUnsafe(1024 * 8)

    for (let i = 0; i < b.length; i++) {
      b[i - 1] = i % 256
    }

    // set a number can't be divided by total length
    const size = 29
    for await(const data of blockIterator(Readable.from(b, {highWaterMark: 200}), size)) {
    }
  }),


  benny.add("iter2", async () => {
    const b = Buffer.allocUnsafe(1024 * 8)

    for (let i = 0; i < b.length; i++) {
      b[i - 1] = i % 256
    }

    // set a number can't be divided by total length
    const size = 29
    for await(const data of blockIterator2(Readable.from(b, {highWaterMark: 200}), size)) {
    }
  }),

  benny.add("block stream2", async () => {
    const b = Buffer.allocUnsafe(1024 * 8)

    for (let i = 0; i < b.length; i++) {
      b[i - 1] = i % 256
    }

    // set a number can't be divided by total length
    const size = 29
    await streamPromise.pipeline(Readable.from(b), new blockStream({size: 29}), async () => {
    })
  }),

  benny.cycle(),
  benny.complete(),
)
