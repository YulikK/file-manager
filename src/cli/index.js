import process from 'process';
import User from '../user/index.js';
import Navigation from '../navigation/index.js';
import FileOperation from '../file-operation/index.js';
import OperatingSystem from '../operating-system/index.js';
import { COMMANDS_MAP } from '../constants.js';
import { parseInput } from '../helper.js';

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
      const input = data.toString().replace(/(\r\n|\n|\r)/gm, '');
      const { command, args } = parseInput(input);

      switch (command) {
        case COMMANDS_MAP.UP:
          this.navigation.up();
          break;
        case COMMANDS_MAP.CD:
          this.navigation.cd(args);
          break;
        case COMMANDS_MAP.LS:
          this.navigation.ls();
          break;
        case COMMANDS_MAP.CAT:
          await this.fileOperation.cat(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.ADD:
          await this.fileOperation.add(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.MKDIR:
          await this.fileOperation.mkdir(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.RN:
          await this.fileOperation.rn(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.CP:
          await this.fileOperation.cp(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.MV:
          await this.fileOperation.mv(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.RM:
          await this.fileOperation.rm(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.OS:
          this.os.run(args);
          break;
        case COMMANDS_MAP.HASH:
          await this.fileOperation.hash(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.COMPRESS:
          await this.fileOperation.compress(
            this.navigation.getCurrentDirectory(),
            args
          );
          break;
        case COMMANDS_MAP.DECOMPRESS:
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
