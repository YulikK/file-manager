import process from 'process';
import os from 'os';
import { logWithColor } from '../helper.js';

const USER_NAME_PREFIX = '--username';
class User {
  constructor() {
    this.user = this.#getUser();
    this.#sayHi();
    this.#setupExitHandlers();
  }

  #sayHi() {
    logWithColor(`Welcome to the File Manager, ${this.user}!`, 'green');
  }

  #sayBye() {
    logWithColor(
      `${os.EOL}Thank you for using File Manager, ${this.user}, goodbye!`,
      'green'
    );
    process.exit();
  }

  #getUser() {
    const args = process.argv.slice(2);
    const usernameArg = args.find((arg) =>
      arg.startsWith(`${USER_NAME_PREFIX}=`)
    );
    if (!usernameArg) {
      return 'Anonymous';
    }
    return usernameArg.split('=')[1];
  }

  #setupExitHandlers() {
    const exitEvents = [
      {
        target: process.stdin,
        event: 'data',
        handler: (data) => {
          const input = data.toString().trim();
          if (input === '.exit') this.#sayBye();
        },
      },
      { target: process, event: 'SIGINT', handler: () => this.#sayBye() },
      { target: process.stdin, event: 'end', handler: () => this.#sayBye() },
    ];

    exitEvents.forEach(({ target, event, handler }) => {
      target.on(event, handler);
    });
  }
}

export default User;
