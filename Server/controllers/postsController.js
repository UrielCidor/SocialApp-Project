const config = require("../config/authentication");
const db = require("../models");
const Post = db.post;
const User = db.user

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

exports.getAllPostsBySearches = async (req, res) => {
    console.log("line 96:", req.body)
    let allPosts = await Post.find().exec()
    let filterAllPostsDates;
    if (req.body.startDate === '' || req.body.endDate === '') {
        filterAllPostsDates = allPosts
    }
    else {
        filterAllPostsDates = allPosts.filter(p => {
            let startDate = new Date(req.body.startDate)
            let endDate = new Date(req.body.endDate)
            /*          console.log("line 103:" ,endDate) */
            return p.date >= startDate && p.date <= endDate
        }
        )
    }

    let filterAllPostsPublishers = []
    if (req.body.publishers[0] === "") {
        filterAllPostsPublishers = filterAllPostsDates
    }
    else {
        //console.log("Posts after dates filter: ",filterAllPostsDates)
        let publishersId = []
        const allPublishers = await User.find()
        //console.log("all users in db:", allPublishers)
        allPublishers.forEach(u => {
            req.body.publishers.forEach(p => {
                if (p === u.username) {
                    publishersId.push(u.id)
                }
            })
        })
        console.log(publishersId)
        filterAllPostsDates.forEach(p => {
            publishersId.forEach(pId => {
                if (p.publisher === pId) {
                    filterAllPostsPublishers.push(p)
                }
            })
        })
    }   
    
    let filterAllPostsImageTags = []
    console.log("here:", req.body.imageTags[0])
    if (req.body.imageTags[0] === "") {
        filterAllPostsImageTags = filterAllPostsPublishers
    }
    else {       
        /* let allPosts = await Post.find().exec() */
        filterAllPostsPublishers.forEach(p => {
            p.tags.forEach(tag => {
                req.body.imageTags.forEach(it => {
                    if (tag === it) {
                        filterAllPostsImageTags.push(p)
                    }
                }
                )
            }
            )
        }
        )        
    }
    console.log("all posts after date and publisher and image filter:", filterAllPostsImageTags)
    res.send(filterAllPostsImageTags)
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