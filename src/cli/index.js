import process from 'process';
import User from '../user/index.js';
import Navigation from '../navigation/index.js';
import FileOperation from '../file-operation/index.js';
import OperatingSystem from '../operating-system/index.js';
import { COMMANDS } from '../constants.js';

export default class Cli {
  constructor() {
    this.user = new User();
    this.navigation = new Navigation();
    this.fileOperation = new FileOperation();
    this.os = new OperatingSystem();
    this.#setupInputHandler();
    this.#printCurrentDirectory();
  }

  #printCurrentDirectory() {
    console.log(
      `You are currently in ${this.navigation.getCurrentDirectory()}`
    );
  }

  #setupInputHandler() {
    process.stdin.on('data', async (data) => {
      const input = data.toString().trim();
      const [command, ...args] = input.split(' ');

      switch (command) {
        case COMMANDS.UP:
          this.navigation.up();
          break;
        case COMMANDS.CD:
          this.navigation.cd(args);
          break;
        case COMMANDS.LS:
          this.navigation.ls();
          break;
        case COMMANDS.CAT:
          await this.fileOperation.cat(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.ADD:
          await this.fileOperation.add(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.MKDIR:
          await this.fileOperation.mkdir(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.RN:
          await this.fileOperation.rn(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.CP:
          await this.fileOperation.cp(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.MV:
          await this.fileOperation.mv(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.RM:
          await this.fileOperation.rm(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.OS:
          this.os.run(args);
          break;
        case COMMANDS.HASH:
          await this.fileOperation.hash(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.COMPRESS:
          await this.fileOperation.compress(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS.DECOMPRESS:
          await this.fileOperation.decompress(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        default:
          console.log('Unknown command');
      }
      this.#printCurrentDirectory();
    });
  }
}
