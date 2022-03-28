const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../../config/dbConfig");

var storage = new GridFsStorage({
    url: `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-socialApp-${file.originalname}`;
        return filename;
      }
      return {
        bucketName: dbConfig.imgBucket,
        filename: `${Date.now()}-socialApp-${file.originalname}`,
      };
    }
  });
  var uploadFiles = multer({ storage: storage }).single("file");
  var uploadFilesMiddleware = util.promisify(uploadFiles);

  module.exports = uploadFilesMiddleware;
