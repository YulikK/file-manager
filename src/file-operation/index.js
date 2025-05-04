import cat from './commands/cat.js';
import add from './commands/add.js';
import mkdir from './commands/mkdir.js';
import rn from './commands/rn.js';
import cp from './commands/cp.js';
import mv from './commands/mv.js';
import rm from './commands/rm.js';

export default class FileOperation {
  async cat(currentDir, args) {
    return await cat(currentDir, args);
  }

  async add(currentDir, args) {
    return await add(currentDir, args);
  }

  async mkdir(currentDir, args) {
    return await mkdir(currentDir, args);
  }

  async rn(currentDir, args) {
    return await rn(currentDir, args);
  }

  async cp(currentDir, args) {
    return await cp(currentDir, args);
  }

  async mv(currentDir, args) {
    return await mv(currentDir, args);
  }

  async rm(currentDir, args) {
    return await rm(currentDir, args);
  }
}
