export const COMMANDS_MAP = {
  UP: {
    name: 'up',
    arg_count: 0,
    example: 'up',
    description: 'Move to parent directory',
  },
  CD: {
    name: 'cd',
    arg_count: 1,
    example: 'cd <path_to_directory>',
    description: 'Move to dedicated directory',
  },
  LS: {
    name: 'ls',
    arg_count: 0,
    example: 'ls',
    description: 'List all files and directories in current directory',
  },
  CAT: {
    name: 'cat',
    arg_count: 1,
    example: 'cat path_to_file',
    description: 'Print content of file',
  },
  ADD: {
    name: 'add',
    arg_count: 1,
    example: 'add new_file_name',
    description: 'Add file to current directory',
  },
  MKDIR: {
    name: 'mkdir',
    arg_count: 1,
    example: 'mkdir new_directory_name',
    description: 'Create new directory',
  },
  RN: {
    name: 'rn',
    arg_count: 2,
    example: 'rn path_to_file new_file_name',
    description: 'Rename file',
  },
  CP: {
    name: 'cp',
    arg_count: 2,
    example: 'cp path_to_file path_to_new_directory',
    description: 'Copy file to directory',
  },
  MV: {
    name: 'mv',
    arg_count: 2,
    example: 'mv path_to_file path_to_new_directory',
    description: 'Move file to directory',
  },
  RM: {
    name: 'rm',
    arg_count: 1,
    example: 'rm path_to_file',
    description: 'Remove file',
  },
  OS: {
    name: 'os',
    arg_count: 1,
    example: 'os --EOL',
    description: 'Operating system info',
  },
  HASH: {
    name: 'hash',
    arg_count: 1,
    example: 'hash path_to_file',
    description: 'Hash file',
  },
  COMPRESS: {
    name: 'compress',
    arg_count: 2,
    example: 'compress path_to_file path_to_destination',
    description: 'Compress file',
  },
  DECOMPRESS: {
    name: 'decompress',
    arg_count: 2,
    example: 'decompress path_to_file path_to_destination',
    description: 'Decompress file',
  },
};

export const OS_COMMANDS = {
  EOL: '--EOL',
  CPUS: '--cpus',
  HOMEDIR: '--homedir',
  USERNAME: '--username',
  ARCHITECTURE: '--architecture',
};

export const COLORS_MAP = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
};
