const controller = require('../controllers/UserController');
module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/user/user", controller.getUser);
    app.get("/api/user/user/:id", controller.getUserById);
}