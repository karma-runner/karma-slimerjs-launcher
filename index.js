var fs = require('fs');
var path = require('path');

var slimerJSExePath = function () {
  return path.join(path.dirname( require('slimerjs').path ), '//xulrunner//xulrunner.exe');
};

var SlimerJSBrowser = function(id, baseBrowserDecorator, logger, args, options) {
  baseBrowserDecorator(this);

  var options = args && args.options || {};
  var log = logger.create('launcher');

  this._getOptions = function(url) {
    var self=this;
    // create the js file, that will open karma
    var captureFile = path.join(self._tempDir, 'capture.js');
    var optionsCode = Object.keys(options).map(function (key) {
      return 'page.' + key + ' = ' + JSON.stringify(options[key]) + ';';
    });
    
    var captureCode = 'var page = require("webpage").create();\n'
    + optionsCode.join('\n')
    + '\npage.onConsoleMessage = function () {'
    + '\n  console.log.apply(console,'
    + '\n    Array.prototype.slice.call(arguments,0).forEach(function(item) {'
    + '\n      return JSON.stringify(item);'
    + '\n    })'
    + '\n  );'
    +' \n};'
    + '\npage.open("' + url + '");\n';
    fs.writeFileSync(captureFile, captureCode);
      return /^win/.test(process.platform) ? ['-app', path.join(path.dirname( require('slimerjs').path ), 'application.ini'), '-profile', path.join(self._tempDir, 'slimerjs-profile'), '-attach-console', '-no-remote', captureFile] : [captureFile];
  };
};


SlimerJSBrowser.prototype = {
  name: 'SlimerJS',

  DEFAULT_CMD: {
    linux: require('slimerjs').path,
    darwin: require('slimerjs').path,
    win32: slimerJSExePath()
  },
  ENV_CMD: 'SLIMERJS_BIN'
};

SlimerJSBrowser.$inject = ['id', 'baseBrowserDecorator', 'logger', 'args', 'config.slimerjsLauncher'];

// PUBLISH DI MODULE
module.exports = {'launcher:SlimerJS': ['type', SlimerJSBrowser]};
