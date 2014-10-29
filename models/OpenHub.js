var mongoose = require('mongoose');
var Settings = require('./Setting.js');

mongoose.connect('mongodb://' + Settings.db_hostname + '/' + Settings.db_name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

});

var OpenHubSchema = mongoose.Schema({
    id: String,
	name: String,
	url: String,
	html_url: String,
	created_at: String,
	updated_at: String,
	description: String,
	homepage_url: String,
	download_url: String,
	url_name: String,
	medium_logo_url: String,
	small_logo_url: String,
	user_count: String,
	average_rating: String,
	rating_count: String,
	review_count: String,
	analysis_id: String,
	tags: String,
	licenses: String,
	links: String
});

var OpenHub = mongoose.model('OpenHub', OpenHubSchema);
module.exports = OpenHub;
