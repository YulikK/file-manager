import process from 'process';
import User from '../user/index.js';
import Navigation from '../navigation/index.js';
import FileOperation from '../file-operation/index.js';
import OperatingSystem from '../operating-system/index.js';
import { COMMANDS_MAP, COLORS_MAP } from '../constants.js';
import { parseInput, logWithColor } from '../helper.js';

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
    logWithColor(
      `You are currently in ${this.navigation.getCurrentDirectory()}`,
      COLORS_MAP.GREEN
    );
  }

  #setupInputHandler() {
    process.stdin.on('data', async (data) => {
      try {
        const input = data.toString().replace(/(\r\n|\n|\r)/gm, '');
        const { command, args } = parseInput(input);

        switch (command) {
          case COMMANDS_MAP.UP.name:
            this.navigation.up();
            break;
          case COMMANDS_MAP.CD.name:
            this.navigation.cd(args);
            break;
          case COMMANDS_MAP.LS.name:
            this.navigation.ls();
            break;
          case COMMANDS_MAP.CAT.name:
            await this.fileOperation.cat(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.ADD.name:
            await this.fileOperation.add(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.MKDIR.name:
            await this.fileOperation.mkdir(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.RN.name:
            await this.fileOperation.rn(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.CP.name:
            await this.fileOperation.cp(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.MV.name:
            await this.fileOperation.mv(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.RM.name:
            await this.fileOperation.rm(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.OS.name:
            this.os.run(args);
            break;
          case COMMANDS_MAP.HASH.name:
            await this.fileOperation.hash(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.COMPRESS.name:
            await this.fileOperation.compress(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.DECOMPRESS.name:
            await this.fileOperation.decompress(
              this.navigation.getCurrentDirectory(),
              args
            );
            break;
          case COMMANDS_MAP.EXIT.name:
            process.exit(0);
        }
        this.#printCurrentDirectory();
      } catch (error) {
        logWithColor(`Operation failed:${error}`, COLORS_MAP.RED);
      }
    });
  }
}
