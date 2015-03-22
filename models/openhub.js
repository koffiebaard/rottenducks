var mongoose = require('mongoose');

var Schema = mongoose.Schema({
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

module.exports = mongoose.model('OpenHub', Schema);
