import os from 'os';
import process from 'process';
import goUp from './commands/up.js';

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

      switch (input) {
        case 'up':
          this.currentDir = goUp(this.currentDir);
          break;
        default:
          console.log('Unknown command');
      }
      this.printCurrentDirectory();
    });
  }
}

export default Navigation;
