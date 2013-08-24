var fs = require('fs');

var SlimerJSBrowser = function(id, baseBrowserDecorator, logger, args, options) {
	baseBrowserDecorator(this);

	var options = args && args.options || {};
	var log = logger.create('launcher');

	this._getOptions = function(url) {
		var self=this;
		var command=this._getCommand();
		// create the js file, that will open karma
		var captureFile = self._tempDir + '/capture.js';
		var optionsCode = Object.keys(options).map(function (key) {
			return 'page.' + key + ' = ' + JSON.stringify(options[key]) + ';';
		});
		var captureCode = 'var page = require("webpage").create();\n'
		+ optionsCode.join('\n')
		+ '\npage.onConsoleMessage = function () {'
		+ '\n	console.log.apply(console,'
		+ '\n		Array.prototype.slice.call(arguments,0).forEach(function(item) {'
		+ '\n			return JSON.stringify(item);'
		+ '\n		})'
		+ '\n	);'
		+' \n};'
		+ '\npage.open("' + url + '");\n';
		console.log(captureCode);
		fs.writeFileSync(captureFile, captureCode);

		// and start slimerjs
		return [captureFile];
	};
};


SlimerJSBrowser.prototype = {
	name: 'SlimerJS',

	DEFAULT_CMD: {
		linux: 'slimerjs',
		darwin: '/Applications/SlimerJS.app/Contents/MacOS/SlimerJS-bin',
		win32: process.env.ProgramFiles + '\\Mozilla SlimerJS\\SlimerJS.exe'
	},
	ENV_CMD: 'SLIMERJSLAUNCHER'
};

SlimerJSBrowser.$inject = ['id', 'baseBrowserDecorator', 'logger', 'args', 'config.slimerjsLauncher'];

// PUBLISH DI MODULE
module.exports = {'launcher:SlimerJS': ['type', SlimerJSBrowser]};
