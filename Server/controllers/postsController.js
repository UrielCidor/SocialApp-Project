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

exports.getAllPostsByPublisher = async (req, res) => {
    const publisher = req.query.publisherId
    let allPosts = await Post.find({
        publisher: publisher
    }).exec(); 
/*     const filterPosts = allPosts.filter(p => 
        p.publisher === publisher
    ) */
    console.log(allPosts)
    res.send(allPosts)
}

exports.getAllPostsByDates = async (req, res) => {
    console.log("line 29:", req.query)
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    console.log("line 32:", startDate, endDate)
    let allPosts = await Post.find({
/*         startDate: startDate, 
        endDate: endDate */
    }).exec();
    const filterDates = allPosts.filter(p =>
        p.date >= startDate && p.date <= endDate    
    )  
    console.log("filterDates", filterDates)
    res.send(filterDates)
}

exports.getAllPostsByImageTags = async (req, res) => {
    let imageTags = req.query.tags
    let tags = imageTags.split(",")
    let tt = [];
    tags.forEach(t => tt.push(t.trim()))
    console.log(tt)
    let allPosts = await Post.find({
        tags: tags
    }).exec();
/*     const filterImageTags = allPosts.filter(p =>
         p.imageTags === imageTags
    ) */
    console.log(allPosts)
    res.send(allPosts)
}

exports.getAllPostsByTaggedUsers = async (req, res) => {
    let taggedUsers = req.query.tags
    let tags = taggedUsers.split(",")
    let tt = [];
    tags.forEach(t => tt.push(t.trim()))
    console.log(tt)
    let allPosts = await Post.find({
        tags: tags
    }).exec();
/*     const filterImageTags = allPosts.filter(p =>
         p.imageTags === imageTags
    ) */
    console.log(allPosts)
    res.send(allPosts)
}

exports.getAllPostsByRadius = async (req, res) => {
    const radius = req.query.radius
    let allPosts = await Post.find({
        
    })
    console.log(allPosts)
    res.send(allPosts)
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
        friendsTags: req.body.friendsTags
        // image: req.body.image
    });
    post.save((err, post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Post published successfully!", post });
    })
};

