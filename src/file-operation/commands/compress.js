import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';
import { resolvePath } from '../../helper.js';

export default async function compress(currentDir, args) {
  const sourcePath = resolvePath(currentDir, args[0]);
  const targetPath = resolvePath(currentDir, args[1]);

  await fs.access(sourcePath);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  const brotli = zlib.createBrotliCompress();

  await pipeline(readStream, brotli, writeStream);
}
