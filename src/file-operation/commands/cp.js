import fs from 'fs';
import path from 'path';
import { resolvePath, logWithColor } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function cp(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const sourcePath = resolvePath(currentDir, args[0]);
      const targetPath = path.isAbsolute(args[1])
        ? path.resolve(args[1], path.basename(sourcePath))
        : path.resolve(currentDir, args[1], path.basename(sourcePath));

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(targetPath);

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

      readStream.pipe(writeStream);
    } catch (error) {
      logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
