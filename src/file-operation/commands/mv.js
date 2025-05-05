import fs from 'fs';
import path from 'path';
import { logWithColor, resolvePath } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function mv(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const sourcePath = resolvePath(currentDir, args[0]);
      const targetPath = resolvePath(currentDir, args[1]);

      const finalTargetPath =
        fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()
          ? path.join(targetPath, path.basename(sourcePath))
          : targetPath;

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(finalTargetPath);

      readStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        resolve();
      });

      writeStream.on('error', (error) => {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        resolve();
      });

      writeStream.on('finish', () => {
        fs.unlink(sourcePath, (error) => {
          if (error) {
            logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
          }
          resolve();
        });
      });

      readStream.pipe(writeStream);
    } catch (error) {
      logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
