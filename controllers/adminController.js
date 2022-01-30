const Post = require("../models/postModel");



// module.exports = router exported in adminRoutes.js is used here

module.exports = {
    index: (req, res) => {
        res.render('admin/index')
    },


    getPosts: (req, res) => {
        res.render('admin/posts/index')
    },
    //submit post 
    submitPosts: (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });
        newPost.save().then(post => {
            console.log(post);
            req.flash('success-message', 'post created successfully');
            res.redirect('/admin/posts')
        });
    },


    createPosts: (req, res) => {
        res.render('admin/posts/create')
    }
};