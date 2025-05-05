import fs from 'fs';
import { logWithColor } from '../../helper.js';

export default function ls(currentDir) {
  try {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    const directories = items
      .filter((item) => item.isDirectory())
      .map((item) => ({
        name: `📂 ${item.name}`,
        type: 'DIR',
      }));

    const files = items
      .filter((item) => item.isFile())
      .map((item) => ({
        name: `📄 ${item.name}`,
        type: 'FILE',
      }));

    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    const allItems = [...directories, ...files];

    console.table(allItems, ['name', 'type']);

    return currentDir;
  } catch (error) {
    logWithColor(`Operation failed:${error}`, 'red');
    return currentDir;
  }
}
