import path from 'node:path';
import { chdir } from 'node:process';
import { logWithColor } from '../../helper.js';

export default function goUp(currentDir) {
  const parentDir = path.dirname(currentDir);

  if (parentDir === currentDir) {
    return currentDir;
  }

  try {
    chdir(parentDir);
  } catch (error) {
    logWithColor(`Operation failed:${error}`, 'red');
  }
  return parentDir;
}
