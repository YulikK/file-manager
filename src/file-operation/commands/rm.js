import fs from 'fs';
import { logWithColor, resolvePath } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function rm(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const filePath = resolvePath(currentDir, args[0]);

      fs.unlink(filePath, (error) => {
        if (error) {
          logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
        }
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      resolve();
    }
  });
}
