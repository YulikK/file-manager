import fs from 'fs';
import path from 'path';

export default function mv(currentDir, args) {
  return new Promise((resolve) => {
    if (!args || args.length < 2) {
      console.error('Invalid input');
      resolve();
    }

    try {
      const sourcePath = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(currentDir, args[0]);

      const targetPath = path.isAbsolute(args[1])
        ? args[1]
        : path.resolve(currentDir, args[1]);

      const finalTargetPath =
        fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()
          ? path.join(targetPath, path.basename(sourcePath))
          : targetPath;

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(finalTargetPath);

      readStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      writeStream.on('error', (error) => {
        console.error(`Operation failed:${error}`);
        resolve();
      });

      writeStream.on('finish', () => {
        fs.unlink(sourcePath, (err) => {
          if (err) {
            console.error(`Operation failed:${err}`);
          }
          resolve();
        });
      });

      readStream.pipe(writeStream);
    } catch (error) {
      console.error(`Operation failed:${error}`);
      resolve();
    }
  });
}
