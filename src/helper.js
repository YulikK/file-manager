import path from 'path';
import os from 'os';
import { COMMANDS_MAP } from './constants.js';

export function resolvePath(currentDir, filePath) {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDir, filePath);
}

export const checkArgumentCount = (command, userInput) => {
  const commandConfig = Object.values(COMMANDS_MAP).find(
    (cmd) => cmd.name === command
  );

  if (!commandConfig) {
    console.error(`${os.EOL} Unknown command. Available commands:`);
    console.table(
      Object.values(COMMANDS_MAP).map((cmd) => ({
        Command: cmd.name,
        Description: cmd.description,
        Example: cmd.example,
      }))
    );
    return;
  }

  const args = extractArguments(userInput);
  const providedArgsCount = args.length - 1;

  if (providedArgsCount !== commandConfig.arg_count) {
    console.error(
      `Incorrect number of arguments provided. Expected ${commandConfig.arg_count} arguments.`
    );
    return;
  }
};

export const extractArguments = (userInput) => {
  return userInput.trim().match(/(?:[^\s"]+|"[^"]*")/g) || [];
};

export const extractArgument = (userInput, argNumber) => {
  const args = extractArguments(userInput);
  let argument = args[argNumber] || '';
  if (argument.startsWith('"') && argument.endsWith('"')) {
    argument = argument.substring(1, argument.length - 1);
  }

  return argument;
};

export const parseInput = (userInput) => {
  const command = extractArgument(userInput, 0);

  checkArgumentCount(command, userInput);

  return command;
};
