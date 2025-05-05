import fs from 'node:fs/promises';
import { logWithColor, resolvePath } from '../../helper.js';
import { COLORS_MAP, COMMANDS_MAP } from '../../constants.js';

export default async function add(currentDir, args) {
  const filePath = resolvePath(currentDir, args[0]);

  await fs.writeFile(filePath, '', { flag: 'wx' });
  logWithColor(`${COMMANDS_MAP.ADD.success_msg}: ${filePath}`, COLORS_MAP.BLUE);
}
