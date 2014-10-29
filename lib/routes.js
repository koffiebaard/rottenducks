var express = require('express');
var fs = require('fs');
var utils = require('./utils.js');

module.exports = function(parent, options){

	var verbose = options.verbose;

	var routes = {
		stats: [
			{
				request_method: "get",
				request_path: "/stats",
				controller_method: "index"
			},
			{
				request_method: "get",
				request_path: "/stats/:project",
				controller_method: "project"
			}
		],
		content: [
			{
				request_method: "get",
				request_path: "/",
				controller_method: "index"
			}
		],
	};

	fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
		name = utils.stripFilename(name);

		verbose && console.log('\n   %s:', name);

		var controller = require('./../controllers/' + name);
		var controller_name = name;

		var name = controller.name || name;
		var prefix = controller.prefix || '';
		var app = express();

		// allow specifying the view engine
		if (controller.engine) {
			app.set('view engine', controller.engine);
		}

		if (routes[controller_name] && routes[controller_name].length > 0) {

			for (route_offset in routes[controller_name]) {

				var route = routes[controller_name][route_offset];

				var handler = controller[route.controller_method];
				var method = route.request_method;
				var path = prefix + route.request_path ;
				var controller_method = route.controller_method

				// "before" middleware support
				if (controller.before) {
					app[method](path, controller.before, handler);
					verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), path, controller_method);
				} else {
					app[method](path, handler);
					verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, controller_method);
				}
			}

			// mount the app
			parent.use(app);
		}
	});
};