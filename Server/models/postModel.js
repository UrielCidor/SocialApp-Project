const mongoose = require("mongoose");
const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title: String,
        publisher: String,
        date: String,
        text: String,
        likes: [],
        tags: [],
        location: { coords: { latitude: Number, longitude: Number } }
        // image:??
    })
);
module.exports = Post;