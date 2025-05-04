import os from 'os';
import process from 'process';
import goUp from './commands/up.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';

class Navigation {
  constructor() {
    this.currentDir = os.homedir();
    process.chdir(this.currentDir);
    this.#setupInputHandler();
    this.printCurrentDirectory();
  }

  // getCurrentDirectory() {
  //   return this.currentDir;
  // }

  printCurrentDirectory() {
    console.log(`You are currently in ${this.currentDir}`);
  }

  #setupInputHandler() {
    process.stdin.on('data', (data) => {
      const input = data.toString().trim();
      const [command, ...args] = input.split(' ');

      switch (command) {
        case 'up':
          this.currentDir = goUp(this.currentDir);
          break;
        case 'cd':
          this.currentDir = cd(this.currentDir, args);
          break;
        case 'ls':
          this.currentDir = ls(this.currentDir);
          break;
        default:
          console.log('Unknown command');
      }
      this.printCurrentDirectory();
    });
  }
}

export default Navigation;
