const controller = require('../controllers/postsController');

module.exports = function(app){
    app.post("/api/post/publish", controller.publishPost);
}