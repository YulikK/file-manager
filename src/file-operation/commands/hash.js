import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export default function hash(currentDir, args) {
  return new Promise((resolve) => {
    if (!args || args.length === 0) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const filePath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath);
      const hash = crypto.createHash('sha256');

      readStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      readStream.on('data', (chunk) => {
        hash.update(chunk);
      });

      readStream.on('end', () => {
        console.log(hash.digest('hex'));
        resolve();
      });
    } catch (error) {
      console.error(`Operation failed:${error}`);
      resolve();
    }
  });
}
