#!/usr/bin/env node
var argv = require('yargs').argv,
    https = require('https'),
    parseString = require('xml2js').parseString,
    OpenHubUtils = require('../../lib/openhub.js'),
    Settings = require('../../models/setting.js');

require('../../lib/db.js');
global.logger = require('../../lib/logger');


var verbose = argv.v || false;

var openhub_api_key = Settings.crawler_openhub_api_key;

if (argv.api_key) {
	openhub_api_key = argv.api_key;
}

var openhub_url = "https://www.openhub.net/projects.xml?api_key=" + openhub_api_key;

var crawl_page_from = 1;
if (argv.crawl_page_from) {
	crawl_page_from = argv.crawl_page_from;
}

var crawl_page_to = 1;
if (argv.crawl_page_to) {
	crawl_page_to = argv.crawl_page_to;
}

for (var page_to_crawl = crawl_page_from; page_to_crawl <= crawl_page_to; page_to_crawl++) {

	var fetch_openhub_url = openhub_url + "&page=" + page_to_crawl;

	console.log("Fetching: %s", fetch_openhub_url);

	https.get(fetch_openhub_url, function(res) {

		var xml = "";
		res.setEncoding('utf8');

		res.on('data', function (xml_chunk) {
			xml += xml_chunk;
		});

		res.on('end', function () {
			parseString(xml, function (err, serialized_xml) {
console.log("we have a fetched page!");
				var projects = OpenHubUtils.fixProjects(serialized_xml);

				for (var id in projects) {
                    if (projects.hasOwnProperty(id)) {
                        var project = projects[id];

                        if (project.id) {
console.log("project!");
                            OpenHubUtils.updateProject(project);
                        }
                    }
				}
			});
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}
