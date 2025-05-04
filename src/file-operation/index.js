import cat from './commands/cat.js';

export default class FileOperation {
  async cat(currentDir, args) {
    return await cat(currentDir, args);
  }
}
