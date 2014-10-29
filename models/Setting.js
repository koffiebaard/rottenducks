var fs = require('fs');
var utils = require('../lib/utils.js');

module.exports = {};

var environment = fs.readFileSync('/etc/environment', {encoding: "utf-8"});

var environment = utils.trim(environment);

if (environment && environment.length > 0) {
	var settings = fs.readFileSync('../../../rottenducks-essentials/conf/' + environment + '.json', {encoding: "utf-8"});
	settings = JSON.parse(settings);

	module.exports = settings;
}
