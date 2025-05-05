import fs from 'fs';
import os from 'os';
import { resolvePath } from '../../helper.js';

export default function cat(currentDir, args) {
  return new Promise((resolve, reject) => {
    if (!args || args.length === 0) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const filePath = resolvePath(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

      readStream.on('error', (error) => {
        console.error('Operation failed');
        resolve();
      });

      readStream.on('end', () => {
        process.stdout.write(os.EOL);
        resolve();
      });

      readStream.pipe(process.stdout);
    } catch (error) {
      console.error('Operation failed');
      resolve();
    }
  });
}
