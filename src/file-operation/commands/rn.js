import fs from 'fs';
import path from 'path';
import { logWithColor, resolvePath } from '../../helper.js';

export default function rn(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const oldPath = resolvePath(currentDir, args[0]);
      const newPath = path.resolve(path.dirname(oldPath), args[1]);

      fs.rename(oldPath, newPath, (error) => {
        if (error) {
          logWithColor(`Operation failed:${error}`, 'red');
          resolve();
        }
        resolve();
      });
    } catch (error) {
      logWithColor(`Operation failed:${error}`, 'red');
      resolve();
    }
  });
}
