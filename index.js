/**
 * @param {Buffer[]} chunks
 * @param {number} size
 */
function concat(chunks, size) {
  const b = Buffer.allocUnsafe(size)
  let offset = 0
  for (const chunk of chunks) {
    b.set(chunk, offset)
    offset += chunk.length
  }

  return b
}

/**
 *
 * @param {AsyncIterable<Buffer>} iterator
 * @param size
 * @returns {AsyncGenerator<Buffer, void, *>}
 */
async function* streamChunkIter(iterator, size = 512) {
  /**
   *
   * @type {Buffer[]}
   */
  let buffered = []
  let bufferedBytes = 0

  for await (const value of iterator) {
    bufferedBytes += value.length
    buffered.push(value)

    if (bufferedBytes >= size) {
      const b = concat(buffered, bufferedBytes)
      let offset = 0

      while (bufferedBytes >= size) {
        yield b.subarray(offset, offset + size)
        bufferedBytes -= size
        offset += size
      }

      buffered = [b.subarray(offset, b.length)]
    }
  }

  if (bufferedBytes) {
    yield concat(buffered, bufferedBytes)
  }
}

module.exports = streamChunkIter
module.exports.default = streamChunkIter
module.exports.streamChunkIter = streamChunkIter
