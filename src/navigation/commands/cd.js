import process from 'node:process';
import { resolvePath } from '../../helper.js';

export default function cd(currentDir, args) {
  const newPath = resolvePath(currentDir, args[0]);

  process.chdir(newPath);

  return newPath;
}
