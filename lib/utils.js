exports.stripFilename = function(filename) {
	return filename.replace(/\.[^/.]+$/, "");
}

exports.trim = function(string_text) {
	return string_text.replace(/^\s+|\s+$/g, '');
}