import os from 'os';
import { OS_COMMANDS } from '../constants.js';
import { logWithColor } from '../helper.js';

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
    }
  }

  #getEOL() {
    logWithColor(`OS EOL: ${JSON.stringify(os.EOL)}`, 'blue');
  }

  #getCPUs() {
    const cpus = os.cpus();
    const cpuInfo = cpus.map((cpu, index) => ({
      number: index + 1,
      model: cpu.model,
      speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
    }));

    logWithColor(`Overall amount of CPUs: ${cpus.length}`, 'blue');
    console.table(cpuInfo);
  }

  #getHomeDir() {
    logWithColor(`Home dir: ${os.homedir()}`, 'blue');
  }

  #getUsername() {
    logWithColor(`User name: ${os.userInfo().username}`, 'blue');
  }

  #getArchitecture() {
    logWithColor(`Architecture: ${os.arch()}`, 'blue');
  }
}
