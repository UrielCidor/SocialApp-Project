const User = require("../models/userModel");

exports.getUser = (req, res) => {
    User.findOne({
        username: req.query.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send(user);
    })
  };