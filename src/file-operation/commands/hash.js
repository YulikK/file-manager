import fs from 'fs';
import crypto from 'crypto';
import { resolvePath, logWithColor } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function hash(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const filePath = resolvePath(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath);
      const hash = crypto.createHash('sha256');

      readStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        resolve();
      });

      readStream.on('data', (chunk) => {
        hash.update(chunk);
      });

      readStream.on('end', () => {
        logWithColor(hash.digest('hex'), COLORS_MAP.BLUE);
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
