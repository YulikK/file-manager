import fs from 'fs';
import path from 'path';

export default function add(currentDir, args) {
  return new Promise((resolve, reject) => {
    if (!args || args.length === 0) {
      console.error('Invalid input');
      resolve(currentDir);
      return;
    }

    try {
      const filePath = path.resolve(currentDir, args[0]);
      
      fs.writeFile(filePath, '', (err) => {
        if (err) {
          console.error('Operation failed');
          resolve(currentDir);
          return;
        }
        resolve(currentDir);
      });
    } catch (error) {
      console.error('Operation failed');
      resolve(currentDir);
    }
  });
}