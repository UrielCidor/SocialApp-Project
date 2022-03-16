const { verifySignUp } = require('../login');
const controller = require('../controllers/loginController');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        verifySignUp,
        controller.signup
    );
    app.put(
        "/api/auth/reset",
        controller.resetPassword
    );
    app.post("/api/auth/signin", controller.signin);
    app.get("/api/auth/forgot", controller.forgotPassword);

    
};