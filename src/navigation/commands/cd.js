import process from 'process';
import { logWithColor, resolvePath } from '../../helper.js';
import { COMMANDS_MAP } from '../../constants.js';

export default function cd(currentDir, args) {
  try {
    const newPath = resolvePath(currentDir, args[0]);

    process.chdir(newPath);

    return newPath;
  } catch (error) {
    logWithColor(`Operation failed:${error}`, 'red');
    return currentDir;
  }
}
