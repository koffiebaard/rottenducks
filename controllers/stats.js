var OpenHub = require('../models/openhub.js');

exports.index = function(req, res, next){
	OpenHub.find({}, function(err, projects){
		res.render('stats/index', {
			number_of_projects: projects.length,
			projects: projects
		});
	});
};


exports.project = function(req, res, next){
	var project_name = req.params.project;
	OpenHub.find({name: project_name}, function(err, projects){
		if (projects.length > 0) {
			var params = {
				project: projects[0]
			};
		} else {
			var params = {project: {}}
		}
		res.render('stats/project', params);
	});
};