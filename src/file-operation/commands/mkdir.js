import fs from 'fs';
import { resolvePath, logWithColor } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function mkdir(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const dirPath = resolvePath(currentDir, args[0]);

      fs.mkdir(dirPath, (err) => {
        if (err) {
          logWithColor(`Operation failed: ${err}`, COLORS_MAP.RED);
          resolve();
        }
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed: ${err}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
