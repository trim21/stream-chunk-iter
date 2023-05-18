/// <reference types="node" />
/// <reference lib="es2018.asynciterable" />

export declare async function* streamChunkIter(iterator: AsyncIterable<Buffer>, size = 512): AsyncIterable<Buffer>
