# karma-slimerjs-launcher

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/karma-runner/karma-slimerjs-launcher)
 [![npm version](https://img.shields.io/npm/v/karma-slimerjs-launcher.svg?style=flat-square)](https://www.npmjs.com/package/karma-slimerjs-launcher) [![npm downloads](https://img.shields.io/npm/dm/karma-slimerjs-launcher.svg?style=flat-square)](https://www.npmjs.com/package/karma-slimerjs-launcher)

[![Build Status](https://img.shields.io/travis/karma-runner/karma-slimerjs-launcher/master.svg?style=flat-square)](https://travis-ci.org/karma-runner/karma-slimerjs-launcher) [![Dependency Status](https://img.shields.io/david/karma-runner/karma-slimerjs-launcher.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-slimerjs-launcher) [![devDependency Status](https://img.shields.io/david/dev/karma-runner/karma-slimerjs-launcher.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-slimerjs-launcher#info=devDependencies)

> Launcher for SlimerJS.

## Installation

The easiest way is to keep `karma-slimerjs-launcher` as a devDependency in your `package.json`. You can simply do that, by running

```bash
$ npm install karma-slimerjs-launcher --save-dev
```

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['SlimerJS'],
  })
}
```

You can pass list of browsers as a CLI argument too:
```bash
$ karma start --browsers SlimerJS,Chrome
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
