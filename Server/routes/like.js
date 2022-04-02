const controller = require('../controllers/LikesController');

module.exports = function(app){
    app.post("/api/like/addLike", controller.addLike);
}