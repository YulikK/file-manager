import path from 'path';
import process from 'process';

export default function cd(currentDir, args) {
  if (!args || args.length === 0) {
    console.error('Invalid input');
    return currentDir;
  }

  try {
    const targetPath = args.join(' ');

    const newPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(currentDir, targetPath);

    process.chdir(newPath);
    return newPath;
  } catch (error) {
    console.error('Operation failed');
    return currentDir;
  }
}
