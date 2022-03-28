const uploadController = require('../controllers/UploadController')
module.exports = function(app){
    app.post("/api/images/upload/:user", uploadController.uploadFiles);
    app.get("/api/images/files/:name", uploadController.download);

}