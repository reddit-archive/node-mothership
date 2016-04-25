import generator from './generator';
import launcher from './launcher';

const COMMAND_MAP = {
  generate: generator,
  launch: launcher,
};

export default function mothership (args) {
  const command = args._[0];

  if (command && COMMAND_MAP[command]) {
    return COMMAND_MAP[command](args);
  }

  return usage();
}

export function usage() {
  log('USAGE: mothership [launch|generate]');
}

export function log() {
  console.log(...arguments);
}
