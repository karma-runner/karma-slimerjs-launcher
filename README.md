# karma-slimerjs-launcher

> Launcher for SlimerJS.

**Warning:** Not maintained, [claim ownership](https://github.com/nfroidure/karma-slimerjs-launcher/issues/4)

## Installation

The easiest way is to keep `karma-slimerjs-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-slimerjs-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-slimerjs-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['SlimerJS'],
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers SlimerJS,Chrome
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
