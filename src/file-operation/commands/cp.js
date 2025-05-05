import fs from 'fs';
import path from 'path';
import { resolvePath } from '../../helper.js';

export default function cp(currentDir, args) {
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
        ? path.resolve(args[1], path.basename(sourcePath))
        : path.resolve(currentDir, args[1], path.basename(sourcePath));

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(targetPath);

      readStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      writeStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });
      д;

      writeStream.on('finish', () => {
        resolve();
      });

      readStream.pipe(writeStream);
    } catch (error) {
      console.error(`Operation failed:${error}`);
      resolve();
    }
  });
}
