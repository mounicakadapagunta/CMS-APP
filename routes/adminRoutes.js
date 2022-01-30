const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.all('/', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})
/*home page */
router.route('/')
    .get(adminController.index);

/*directs to posts page */
router.route('/posts')
    .get(adminController.getPosts)


/*directs to create post page */
router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);


/*exporting router to use it in other files */
module.exports = router;