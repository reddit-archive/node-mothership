import fs from 'fs';
const DEFAULT_ROUTE = parseRoute('/,Index');

export default function generator (options) {
  const {
    addRoute,
    name='newproject',
    bare=false,
    noBuild=false,
    dryRun=false,
    force=false,
    routeFilePath='src/',
    routeFileName='routes.js',
    handlerFilePath='src/handlers/',
    cwd=process.cwd(),
  } = options;

  const projectName = name;
  const structure = getProjectStructure({
    routeFilePath,
    routeFileName,
    handlerFilePath,
    cwd,
    projectName,
  });

  if (addRoute) {
    const route = parseRoute(addRoute);
    logRoute(addNewRoute(route, structure));
  }

  if (structure.projectExists && !force) {
    throw new Error('Project already exists and --force not specified. Aborting.');
  }

  if (dryRun) {
    return logStructure(structure);
  }

  buildProject(structure);

  if (!bare) {
    logRoute(addNewRoute(DEFAULT_ROUTE, structure));
  }

  if (!noBuild) {
    build(structure.cwd);
  }
}

export function getProjectStructure (structure) {
  const { routeFilePath, handlerFilePath, cwd } = structure;
  let { projectName } = structure;
  let projectExists;
  let projectPackage;

  try {
    // Throws if doesn't exist
    projectPackage = JSON.parse(fs.readFileSync(`${cwd}/package.json`).toString());
    projectExists = true;
    projectName = projectPackage.name;
  } catch (e) {
    projectExists = false;
  }

  return {
    ...structure,
    projectExists,
    projectName,
    entryPoint: cwd,
    routeFilePath: `${cwd}/${routeFilePath}`,
    handlerFilePath: `${cwd}/${handlerFilePath}`,
  };
}

export function parseRoute (routeString) {
  const [ path, handlerName ] = routeString.split(',');

  if (path && handlerName) {
    return { path, handlerName };
  }

  throw new Error(`Invalid path specified: "${routeString}"`);
}

export function addNewRoute (route, structure) {
  const { routeFilePath, routeFileName, handlerFilePath } = structure;

  if (!routeFilePath) {
    throw new Error(`No route file found at ${routeFilePath}/${routeFileName}. Aborting. ` +
                    `Specify a file at --route-file-path to override default.`);
  }

  route.handlerFilePath = `${handlerFilePath}${route.handlerName.toLowerCase()}.js`;

  return route;
}

export function logRoute (route) {
  log(`New route created.`);
  log(`Path: ${route.path}`);
  log(`Handler: ${route.handlerName} at ${route.handlerFilePath}`);
}

export function buildProject(structure) {
  log(`Generating project ${structure.projectName}`);
}

export function logStructure (structure) {
  log(structure);
}

export function build (entryPoint) {
  log('Building assets...');
  log(entryPoint);
}

export function log (text) {
  console.log(text);
}
