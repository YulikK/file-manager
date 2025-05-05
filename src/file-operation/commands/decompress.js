import fs from 'fs';
import zlib from 'zlib';
import { resolvePath, logWithColor } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function decompress(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const sourcePath = resolvePath(currentDir, args[0]);
      const targetPath = resolvePath(currentDir, args[1]);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(targetPath);
      const brotli = zlib.createBrotliDecompress();

      readStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        resolve();
      });

      writeStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        resolve();
      });

      writeStream.on('finish', () => {
        resolve();
      });

      readStream.pipe(brotli).pipe(writeStream);
    } catch (error) {
      logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
