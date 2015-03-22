var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    id: String,
    name: String,
    short_description: String,
    description: String,
    language: String,
    tags: String,
    license: String,
    owner: String,
    rating: Number,
    rating_count: String,
    review_count: String,
    user_count: String,
    created_at: String,
    updated_at: String,
    url: String,
    url_name: String,
    download_url: String,
    logo: String,
    small_logo: String
});

module.exports = mongoose.model('Project', Schema);
