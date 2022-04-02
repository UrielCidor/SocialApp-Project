const config = require("../config/authentication");
const db = require("../models");
const Post = db.post;

exports.getAllPosts = async (req, res) => {
    await Post.find({}, (err, posts) => {
        if (!err) {
            res.status(200).send(posts);
        } else {
            throw err
        }
    }).clone().catch(function (err) { console.log(err) }
    )
}
exports.getPostById = async (req, res) => {
    await Post.findById(req.params.id, (err, post) => {
        if (!err) {
            res.status(200).send(post);
        } else {
            return res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err) }
    )
}

exports.publishPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        publisher: req.body.publisher,
        // token: bcrypt.hashSync(req.body.password, 8)
        date: new Date(),
        likes: [],
        tags: req.body.tags,
        location: { latitude: req.body.location.lat, longitude: req.body.location.lng },
        friendsTags: req.body.friendsTags,
        imageUrl: req.body.imageUrl
    });
    post.save((err, post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Post published successfully!", post });
    })
};

