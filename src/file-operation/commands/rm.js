import fs from 'fs';
import { logWithColor, resolvePath } from '../../helper.js';

export default function rm(currentDir, args) {
  return new Promise((resolve) => {
    try {
      const filePath = resolvePath(currentDir, args[0]);

      fs.unlink(filePath, (error) => {
        if (error) {
          logWithColor(`Operation failed:${error}`, 'red');
        }
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed:${error}`, 'red');
      resolve();
    }
  });
}
