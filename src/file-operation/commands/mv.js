import rn from './rn.js';
import cp from './cp.js';

export default async function mv(currentDir, args) {
  await cp(currentDir, args);
  await rn(currentDir, args);
}
