import fs from 'fs';
import path from 'path';
import os from 'os';

export default function cat(currentDir, args) {
  return new Promise((resolve, reject) => {
    if (!args || args.length === 0) {
      console.error('Invalid input');
      resolve(currentDir);
      return;
    }

    try {
      const filePath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

      readStream.on('error', (error) => {
        console.error('Operation failed');
        resolve(currentDir);
      });

      readStream.on('end', () => {
        process.stdout.write(os.EOL);
        resolve(currentDir);
      });

      readStream.pipe(process.stdout);
    } catch (error) {
      console.error('Operation failed');
      resolve(currentDir);
    }
  });
}
