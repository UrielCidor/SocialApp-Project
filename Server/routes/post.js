const controller = require('../controllers/postsController');

module.exports = function(app){
    app.post("/api/post/publish", controller.publishPost);
    app.get("/api/post/allPosts", controller.getAllPosts);
    app.get("/api/post/getPost/:id", controller.getPostById);
}