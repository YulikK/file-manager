import fs from 'fs';
import zlib from 'zlib';
import { resolvePath } from '../../helper.js';

export default function compress(currentDir, args) {
  return new Promise((resolve) => {
    if (!args || args.length < 2) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const sourcePath = resolvePath(currentDir, args[0]);

      const targetPath = resolvePath(currentDir, args[1]);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(targetPath);
      const brotli = zlib.createBrotliCompress();

      readStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      writeStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      writeStream.on('finish', () => {
        resolve();
      });

      readStream.pipe(brotli).pipe(writeStream);
    } catch (error) {
      console.error(`Operation failed:${error}`);
      resolve();
    }
  });
}
