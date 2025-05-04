import fs from 'fs';
import path from 'path';

export default function rn(currentDir, args) {
  return new Promise((resolve, reject) => {
    if (!args || args.length < 2) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const oldPath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      const newPath = path.resolve(path.dirname(oldPath), args[1]);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Operation failed');
          resolve();
        }
        resolve();
      });
    } catch (error) {
      console.error('Operation failed');
      resolve();
    }
  });
}
