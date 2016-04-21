import fs from 'fs';

export default class Generator {
  static DEFAULT_ROUTE = '/,Index';

  constructor ({ bare, noBuild, dryRun, force, addRoute, routeFilePath, cwd, name }) {
    const projectName = name;
    const structure = this.getProjectStructure({ routeFilePath, cwd, projectName });

    if (addRoute) {
      const route = this.parseRoute(addRoute);
      this.logRoute(this.addRoute(route, routeFilePath || structure.routeFilePath));
    }

    if (structure.projectExists && !force) {
      throw new Error('Project already exists and --force not specified. Aborting.');
    }

    if (dryRun) {
      return this.logStructure(structure);
    }

    this.buildProject(structure);

    if (!bare) {
      this.addRoute(Generator.DEFAULT_ROUTE);
    }

    if (!noBuild) {
      this.build(structure.cwd);
    }
  }

  getProjectStructure ({ routeFilePath='lib/routes.js', cwd=__dirname, projectName }) {
    let projectExists;
    let projectPackage;

    try {
      // Throws if doesn't exist
      projectPackage = fs.readFileSync(`${cwd}/package.json`);
    } catch (e) {
      projectExists = false;
    }

    return {
      cwd,
      projectExists,
      entryPoint: cwd,
      routeFilePath: `${cwd}/${routeFilePath}`,
      projectName: projectPackage || projectName,
    };
  }

  parseRoute (routeString) {
    const [ path, handlerName ] = routeString.split(',');

    if (path && handlerName) {
      return { path, handlerName };
    }

    throw new Error(`Invalid path specified: "${routeString}"`);
  }

  addRoute (route, routeFilePath) {
    if (!routeFilePath) {
      throw new Error(`No route file found at ${routeFilePath}. Aborting. ` +
                      `Specify a file at --route-file-path to override default.`);
    }
  }

  logRoute (route) {
    this.log(`New route created.`);
    this.log(`Path: ${route.path}`);
    this.log(`Handler: ${route.handlerName} at ${route.handlerFilePath}`);
  }

  buildProject(structure) {
    this.log(`Generating project ${structure.projectName}`);
  }

  logStructure (structure) {
    this.log(structure);
  }

  build (entryPoint) {
    this.log('Building assets...');
    this.log(entryPoint);
  }

  log (text) {
    console.log(text);
  }
}
