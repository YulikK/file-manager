import cat from './commands/cat.js';
import add from './commands/add.js';

export default class FileOperation {
  async cat(currentDir, args) {
    return await cat(currentDir, args);
  }

  async add(currentDir, args) {
    return await add(currentDir, args);
  }
}
