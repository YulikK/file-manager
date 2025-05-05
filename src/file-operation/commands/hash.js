import fs from 'fs';
import crypto from 'crypto';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';
import { resolvePath } from '../../helper.js';

export default async function hash(currentDir, args) {
  const filePath = resolvePath(currentDir, args[0]);
  const readStream = fs.createReadStream(filePath);

  const hash = crypto.createHash('sha256');

  await pipeline(readStream, hash.setEncoding('hex'), stdout, { end: false });
}
