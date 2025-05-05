import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export default function compress(currentDir, args) {
  return new Promise((resolve) => {
    if (!args || args.length < 2) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const sourcePath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      const targetPath = path.isAbsolute(args[1])
        ? args[1]
        : path.resolve(currentDir, args[1]);

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