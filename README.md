mothership
==========

A set of tools for building isomorphic web apps with
[@r/framework](https://github.com/reddit/node-framework). Provides a build
system, server GUI, project generator, and some helpful utilities.

Example
-------

```
mothership generate reddit-mobile
> generating project "reddit-mobile"...
> building directory structure...
  - README
  - server.js
  - client.js
  - config.js
  - middleware/
  - assets/
  - tests/
> generating package.json...
> installing npm modules...
> building initial packages...
Complete! Run `mothership launch` to run the server.

mothership launch
launching reddit-mobile at localhost:4444...
launched 4 processes.
launching repl...

reddit-mobile-app~$ debug web

Showing all logging for web requests...
GET / (80ms)
```

Installation
------------

The easiest way to install is through NPM - just run
`npm install -g @r/mothership`. This will add a binary, `mothership`, to your
global node modules. If you want to use mothership's libraries, such as the
build process, you can instead run `npm install @r/mothership --save` in your
project. If installed locally, you can add [npm scripts](https://docs.npmjs.com/misc/scripts)
such as `"start": "@r/mothership launch"` to your package.json.

Alternatively, clone this repository and run `npm install -g` from the
directory.

CLI Usage
---------

mothership provides a binary for functions involving setting up and launching
@r/framework applications.

### generate

`mothership generate` will use a template to generate a new directory structure
for a web project. It will set up a barebones application with one
"Hello World" page, from which you can begin building your application. It will
also run the first build for you, so you can launch the server and begin working
immediately. It will not overwrite any existing files. It will run `git init` if
`git` is available and there is not an existing repository.

#### Options

* `--bare` does not set up any pages or routes; it will only create the
  directory structure and a minimal package.json file
* `--no-build` skips the first build process
* `--dry-run` will print out what the structure will be, but will not write
  any files.
* `--force` will overwrite any existing, conflicting files.


### Launch

`mothership launch` will launch a webserver. It runs in dev mode by default,
which will watch for file changes and reload web servers, and will launch a
terminal interface which includes a CLI and REPL.

#### Options

* `--no-interface` turns off the terminal interface.
* `--no-watch` turns off the filesystem watcher.
* `--server` is an alias which combines both `--no-interface` and `--no-watch`.

Library Usage
------------

mothership provides libraries to help build @r/framework applications.

### Build

`mothership.Build` provides utilities for using webpack to build web
applications.

#### Example

```javascript
// compile.js

const { Build } = import "@r/mothership";
const options = {};

const build = new Build(options);
build.run();
build.watch();
```

#### Options

Build uses all [standard webpack configuration options](https://webpack.github.io/docs/configuration.html).
Defaults are lised below:

```javascript
const COMMON_CONFIG = {
  output: {
    path: path.join(__dirname, 'bin'),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'stage-2',
            'react',
          ],
          plugins: [
            'transform-class-properties',
            'transform-runtime',
          ],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
}
```
