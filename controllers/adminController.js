const Post = require("../models/postModel"); //.Post;



// module.exports = router exported in adminRoutes.js is used here

module.exports = {
    index: (req, res) => {
        res.render('admin/index')
    },


    getPosts: (req, res) => {
        Post.find().then(posts => {
            // res.send('all posts')
            res.render('admin/posts/index', { posts: posts });
        });
    },
    //submit post 
    submitPosts: (req, res) => {

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
            // allowComments: commentsAllowed,
            // category: req.body.category,
            //file: `/uploads/${filename}`
        });

        newPost.save().then(Post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });

    },


    createPosts: (req, res) => {
        res.render('admin/posts/create')
    }
};