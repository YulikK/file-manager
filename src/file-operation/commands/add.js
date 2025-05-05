import fs from 'fs';
import path from 'path';
import { logWithColor } from '../../helper.js';

export default function add(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.resolve(currentDir, args[0]);

      fs.writeFile(filePath, '', (err) => {
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
