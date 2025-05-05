import fs from 'fs';
import { resolvePath, logWithColor } from '../../helper.js';

export default function mkdir(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const dirPath = resolvePath(currentDir, args[0]);

      fs.mkdir(dirPath, (err) => {
        if (err) {
          logWithColor(`Operation failed: ${err}`, 'red');
          resolve();
        }
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed: ${err}`, 'red');
      resolve();
    }
  });
}
