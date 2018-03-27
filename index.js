var fs = require('fs')
var path = require('path')

function serializeOption (value) {
  if (typeof value === 'function') {
    return value.toString()
  }
  return JSON.stringify(value)
}

var SlimerJSBrowser = function (baseBrowserDecorator, config, args) {
  baseBrowserDecorator(this)

  var options = args && args.options || config && config.options || {}
  var flags = args && args.flags || config && config.flags || []

  this._start = function (url) {
    // Create the js file that will open Karma
    var captureFile = path.join(this._tempDir, '/capture.js')
    var optionsCode = Object.keys(options).map(function (key) {
      if (key !== 'settings') { // settings cannot be overridden, it should be extended!
        return 'page.' + key + ' = ' + serializeOption(options[key]) + ';'
      }
    })

    if (options.settings) {
      optionsCode = optionsCode.concat(Object.keys(options.settings).map(function (key) {
        return 'page.settings.' + key + ' = ' + serializeOption(options.settings[key]) + ';'
      }))
    }

    var captureCode = 'var page = require("webpage").create();\n' +
      optionsCode.join('\n') + '\npage.open("' + url + '");\n'
    fs.writeFileSync(captureFile, captureCode)

    flags = flags.concat(captureFile)

    // Start SlimerJS
    this._execCommand(this._getCommand(), flags)
  }
}

SlimerJSBrowser.prototype = {
  name: 'SlimerJS',

  DEFAULT_CMD: {
    linux: require('slimerjs').path,
    darwin: require('slimerjs').path,
    win32: path.join(path.dirname(require('slimerjs').path), '/slimerjs.bat')
  },
  ENV_CMD: 'SLIMERJS_BIN'
}

SlimerJSBrowser.$inject = ['baseBrowserDecorator', 'config.slimerjsLauncher', 'args']

// PUBLISH DI MODULE
module.exports = {'launcher:SlimerJS': ['type', SlimerJSBrowser]}
