import fs from 'fs';
import zlib from 'zlib';
import { resolvePath, logWithColor } from '../../helper.js';

export default function compress(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const sourcePath = resolvePath(currentDir, args[0]);
      const targetPath = resolvePath(currentDir, args[1]);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(targetPath);
      const brotli = zlib.createBrotliCompress();

      readStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, 'red');

        resolve();
      });

      writeStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, 'red');
        resolve();
      });

      writeStream.on('finish', () => {
        resolve();
      });

      readStream.pipe(brotli).pipe(writeStream);
    } catch (error) {
      logWithColor(`Operation failed:${error}`, 'red');
      resolve();
    }
  });
}
