import path from 'path';
import os from 'os';
import { COMMANDS_MAP, COLORS_MAP } from './constants.js';

export function resolvePath(currentDir, filePath) {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDir, filePath);
}

export const extractAllArguments = (command, userInput) => {
  const commandConfig = Object.values(COMMANDS_MAP).find(
    (cmd) => cmd.name === command
  );

  if (!commandConfig) {
    logWithColor(
      `${os.EOL} Unknown command. Available commands:`,
      COLORS_MAP.RED
    );
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
    logWithColor(
      `Incorrect number of arguments provided. Expected ${commandConfig.arg_count} arguments.`,
      COLORS_MAP.RED
    );
    return null;
  }
  return args.slice(1);
};

export const extractArguments = (userInput) => {
  return (
    userInput
      .trim()
      .match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
      .map((arg) => {
        if (
          (arg.startsWith('"') && arg.endsWith('"')) ||
          (arg.startsWith("'") && arg.endsWith("'"))
        ) {
          return arg.slice(1, -1);
        }
        return arg;
      }) || []
  );
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
  const args = extractAllArguments(command, userInput);
  if (!args || !command) {
    return { command: null, args: null };
  }
  return { command, args };
};

export const logWithColor = (text, color) => {
  const msg = makeColorMsg(text, color);
  console.log(msg);
};

export const makeColorMsg = (text, color) => {
  return `${color}${text}${COLORS_MAP.RESET}`;
};
