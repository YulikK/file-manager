import fs from 'fs';
import path from 'path';
import { logWithColor } from '../../helper.js';
import { COLORS_MAP } from '../../constants.js';

export default function add(currentDir, args) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.resolve(currentDir, args[0]);

      fs.writeFile(filePath, '', (err) => {
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
