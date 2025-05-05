import os from 'os';
import process from 'process';
import goUp from './commands/up.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';

class Navigation {
  constructor() {
    this.currentDir = os.homedir();
    process.chdir(this.currentDir);
  }

  getCurrentDirectory() {
    return this.currentDir;
  }

  up() {
    this.currentDir = goUp(this.currentDir);
  }

  cd(args) {
    this.currentDir = cd(this.currentDir, args);
  }

  ls() {
    ls(this.currentDir);
  }
}

export default Navigation;
