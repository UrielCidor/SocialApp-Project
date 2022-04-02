const mongoose = require("mongoose");
const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title: String,
        publisher: String,
        date: Date,
        likes: [],
        tags: [],
        friendsTags: [],
        location: { latitude: Number, longitude: Number },
        imageUrl: String
    })
);
module.exports = Post;