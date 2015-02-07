import dts = require('../index');

var kwArgs:{
	[key:string]: any;
	excludes?: string[];
	externs?: string[];
} = {};

for (var i = 2, j = process.argv.length; i < j; i += 2) {
	var key = process.argv[i].replace(/^-+/, '');
	var value = process.argv[i + 1];

	if (key === 'exclude') {
		if (!kwArgs.excludes) {
			kwArgs.excludes = [];
		}

		kwArgs.excludes.push(value);
	}
	else if (key === 'extern') {
		if (!kwArgs.externs) {
			kwArgs.externs = [];
		}

		kwArgs.externs.push(value);
	}
	else {
		kwArgs[key] = value;
	}
}

[ 'baseDir', 'name', 'out' ].forEach(function (key) {
	if (!kwArgs[key]) {
		console.error('Missing required argument "' + key + '"');
		process.exit(1);
	}
});

console.log('Starting');
dts.generate(<any> kwArgs, console.log.bind(console)).then(function () {
	console.log('Done!');
}, function (error: dts.EmitterError) {
	console.error(error);
	process.exit(error.status || 1);
});
