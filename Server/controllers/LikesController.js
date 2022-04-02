const db = require("../models");
const Like = db.like;
const Post = db.post;

exports.addLike = async (req, res) => {
    let currentPost = await Post.findById(req.body.postId);
    if (currentPost.likes.find(l => l.user === req.body.userId)) {
        return res.send({ message: "You already liked this post!!!", post: currentPost })
    }
    try {
        const like = new Like({
            user: req.body.userId,
            post: req.body.postId,
            time: Date.now()
        });
        await like.save(async (err, like) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Post.findByIdAndUpdate(req.body.postId, { $push: { likes: like } }).exec(async (err, post) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!post) {
                    return res.status(404).send({ message: "Post Not found." });
                }
            })
            let post = await Post.findById(req.body.postId);
            res.status(200).send({
                message: "Like add to post successfully.",
                post: post
            });
        })
    } catch (err) {
        console.log(err);
        return res.send({
            message: `Error when trying to update post likes: ${err}`,
        });
    }
};

