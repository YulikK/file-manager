import path from 'path';
import process from 'process';
import { logWithColor } from '../../helper.js';

export default function cd(currentDir, args) {
  try {
    const targetPath = args.join(' ');

    const newPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(currentDir, targetPath);

    process.chdir(newPath);
    return newPath;
  } catch (error) {
    logWithColor(`Operation failed:${error}`, 'red');
    return currentDir;
  }
}
