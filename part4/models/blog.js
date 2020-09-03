const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

// Rename id prop
blogSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString();
		delete obj._id;
	}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
