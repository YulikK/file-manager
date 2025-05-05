import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { resolvePath } from '../../helper.js';

export default async function cp(currentDir, args) {
  const sourcePath = resolvePath(currentDir, args[0]);
  const sourceFileName = path.basename(sourcePath);
  const destFolderPath = resolvePath(currentDir, args[1]);
  const targetPath = path.resolve(destFolderPath, sourceFileName);

  await fs.access(sourcePath);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  await pipeline(readStream, writeStream);
}
