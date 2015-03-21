var fs = require('fs');
var utils = require('../lib/utils.js');

module.exports = {};

var environment = fs.readFileSync('../environment', {encoding: "utf-8"});

if (environment)
    environment = utils.trim(environment);
else
    environment = "development";

if (environment && environment.length > 0) {

    if (environment == "development")
        var relativePathBetweenApps = "../";
    else
        var relativePathBetweenApps = "../../";

	var settings = fs.readFileSync(relativePathBetweenApps + 'rottenducks-essentials/conf/' + environment + '.json', {encoding: "utf-8"});
	settings = JSON.parse(settings);

	module.exports = settings;
}
