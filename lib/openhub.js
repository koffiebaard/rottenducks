var OpenHub = require('../models/openhub.js');

module.exports.fixProjects = function fixProjects(projectResponse)
{
	var projects = projectResponse.response.result[0].project;
	var new_projects = {};

	for (key in projects) {
        if (projects.hasOwnProperty(key)) {
            var project = projects[key];

            for (label in project) {
                if (project.hasOwnProperty(label)) {
                    project[label] = project[label][0];
                    if (typeof project[label] === "object") {
                        project[label] = JSON.stringify(project[label]);
                    }

                    new_projects[key] = project;
                }
            }
        }
	}

	return new_projects;
};

module.exports.updateProject = function updateProject(project, verbose)
{
	var query = {id: project.id};
	OpenHub.find(query, function(err, found_projects){
		if (found_projects.length == 0) {
            if (verbose)
                console.log("Adding project..");

			var newProject = new OpenHub(project);
			newProject.save();
		}
        else
            console.log("baww.");
	});
};