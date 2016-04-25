export default function launcher ({ noInterface, noWatch, server }) {
  if (!noWatch || server) {
    watch();
  }

  if (!noInterface || server) {
    startInterface();
  }
}

export function startInterface () {
}

export function watch () {
}
