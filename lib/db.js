var Settings = require('../models/setting.js');
    Mongoose = require('mongoose');

module.exports = Mongoose.connect('mongodb://' + Settings.db_hostname + '/' + Settings.db_name);