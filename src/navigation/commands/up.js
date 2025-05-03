import path from 'path';

export default function goUp(currentDir) {
  const parentDir = path.dirname(currentDir);

  if (parentDir === currentDir) {
    return currentDir;
  }

  try {
    process.chdir(parentDir);
  } catch (error) {
    console.error('Operation failed');
  }
  return parentDir;
}
