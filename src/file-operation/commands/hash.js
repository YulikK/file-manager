import fs from 'fs';
import crypto from 'crypto';
import { resolvePath, logWithColor } from '../../helper.js';

export default function hash(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const filePath = resolvePath(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath);
      const hash = crypto.createHash('sha256');

      readStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, 'red');
        resolve();
      });

      readStream.on('data', (chunk) => {
        hash.update(chunk);
      });

      readStream.on('end', () => {
        logWithColor(hash.digest('hex'), 'blue');
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed:${error}`, 'red');
      resolve();
    }
  });
}
