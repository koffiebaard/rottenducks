var OpenHub = require('../models/OpenHub.js');

module.exports.fixProjects = function fixProjects(projects)
{
	var projects = projects.response.result[0].project;
	var new_projects = {};

	for (key in projects) {
		var project = projects[key];

		for (label in project) {
			project[label] = project[label][0];
			if (typeof project[label] === "object") {
				project[label] = JSON.stringify(project[label]);
			}

			new_projects[key] = project;
		}
	}

	return new_projects;
}

module.exports.updateProject = function updateProject(project)
{
	var query = {id: project.id};
	OpenHub.find(query, function(err, found_projects){
		console.log(query);
		console.log(found_projects.length);
		if (found_projects.length == 0) {
			var newProject = new OpenHub(project);
			newProject.save();
		}
	});
}