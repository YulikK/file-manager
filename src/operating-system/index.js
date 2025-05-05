import os from 'node:os';
import { OS_COMMANDS } from '../constants.js';
import { logWithColor, invalidOsCommand } from '../helper.js';
import { COLORS_MAP } from '../constants.js';

export default class OperatingSystem {
  run(arg) {
    switch (arg[0]) {
      case OS_COMMANDS.EOL:
        this.#getEOL();
        break;
      case OS_COMMANDS.CPUS:
        this.#getCPUs();
        break;
      case OS_COMMANDS.HOMEDIR:
        this.#getHomeDir();
        break;
      case OS_COMMANDS.USERNAME:
        this.#getUsername();
        break;
      case OS_COMMANDS.ARCHITECTURE:
        this.#getArchitecture();
        break;
      default:
        invalidOsCommand();
        break;
    }
  }

  #getEOL() {
    logWithColor(`OS EOL: ${JSON.stringify(os.EOL)}`, COLORS_MAP.BLUE);
  }

  #getCPUs() {
    const cpus = os.cpus();
    const coreCount = os.availableParallelism();
    const cpuInfo = cpus.map((cpu, index) => ({
      number: index + 1,
      model: cpu.model,
      speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
    }));
    logWithColor(`Number of cores: ${coreCount}`, COLORS_MAP.BLUE);
    console.table(cpuInfo);
  }

  #getHomeDir() {
    logWithColor(`Home dir: ${os.homedir()}`, COLORS_MAP.BLUE);
  }

  #getUsername() {
    logWithColor(`User name: ${os.userInfo().username}`, COLORS_MAP.BLUE);
  }

  #getArchitecture() {
    logWithColor(`Architecture: ${os.arch()}`, COLORS_MAP.BLUE);
  }
}
