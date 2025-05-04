import fs from 'fs';
import path from 'path';

export default function rm(currentDir, args) {
  return new Promise((resolve) => {
    if (!args || args.length === 0) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const filePath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Operation failed:${err}`);
        }
        resolve();
      });
    } catch (error) {
      console.error(`Operation failed:${error}`);
      resolve();
    }
  });
}
