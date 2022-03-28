const controller = require('../controllers/postsController');

module.exports = function(app){
    app.post("/api/post/publish", controller.publishPost);
    app.get("/api/post/allPosts", controller.getAllPosts);
    app.get("/api/post/allPostsByPublisher", controller.getAllPostsByPublisher);
    app.get("/api/post/allPostsByDates", controller.getAllPostsByDates)
    app.get("/api/post/allPostsByImageTags", controller.getAllPostsByImageTags)
    app.get("/api/post/allPostsByTaggedUsers", controller.getAllPostsByTaggedUsers)
    app.get("/api/post/allPostsByRadius", controller.getAllPostsByRadius)
}