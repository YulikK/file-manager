import fs from 'fs';
import os from 'os';
import { resolvePath, logWithColor } from '../../helper.js';

export default function cat(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = resolvePath(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

      readStream.on('error', (error) => {
        logWithColor(`Operation failed: ${err}`);
        resolve();
      });

      readStream.on('end', () => {
        process.stdout.write(os.EOL);
        resolve();
      });

      readStream.pipe(process.stdout);
    } catch (error) {
      logWithColor(`Operation failed: ${err}`);
      resolve();
    }
  });
}
