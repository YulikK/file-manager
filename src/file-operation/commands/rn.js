import fs from 'node:fs/promises';
import path from 'node:path';
import { resolvePath } from '../../helper.js';

export default async function rn(currentDir, args) {
  const oldPath = resolvePath(currentDir, args[0]);
  const newFileName = path.basename(args[1]);
  const newPath = path.resolve(path.dirname(oldPath), newFileName);

  await fs.rename(oldPath, newPath);
}
