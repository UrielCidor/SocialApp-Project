const upload = require("../middlewares/upload/upload");
const dbConfig = require("../config/dbConfig");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/`;
const baseUrl = "http://localhost:4000/api/images/files/";
const mongoClient = new MongoClient(url);

const db = require('../models');
const User = db.user;

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    // console.log("file", req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    User.findByIdAndUpdate(req.params.user, { $push: { images: req.file.id } }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      return res.send({
        imageUrl: baseUrl + req.file.filename,
        message: "File has been uploaded.",
      })
    })

  } catch (error) {
    console.log(error);
    return res.send({
      message: `Error when trying upload image: ${error}`,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.DB);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      // console.log("data:", data)
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  download,
};