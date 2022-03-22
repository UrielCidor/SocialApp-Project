const config = require("../config/authentication");
const db = require("../models");
const Post = db.post;

exports.publishPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        publisher: req.body.id,
        // token: bcrypt.hashSync(req.body.password, 8)
        date: new Date().toISOString(),
        text: req.body.text,
        like: [],
        tags: req.body.tags,
        location: req.body.location,
        // image: req.body.image
    });
    post.save((err, post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Post published successfully!" });
    })
};

