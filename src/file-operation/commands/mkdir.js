import fs from 'node:fs/promises';
import { resolvePath, logWithColor } from '../../helper.js';
import { COLORS_MAP, COMMANDS_MAP } from '../../constants.js';

export default async function mkdir(currentDir, args) {
  const dirPath = resolvePath(currentDir, args[0]);

  await fs.mkdir(dirPath, { recursive: false });

  logWithColor(
    `${COMMANDS_MAP.MKDIR.success_msg}: ${dirPath}`,
    COLORS_MAP.BLUE
  );
}
