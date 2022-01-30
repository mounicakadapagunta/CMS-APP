const express = require('express')
const router = express.Router();
const defaultController = require('../controllers/defaultController')


router.all('/', (req, res, next) => {
    req.app.locals.layout = 'default';
    next();
})

//getting router setup from controllers-defaultcontrollers
//created a router object and a route function 
//this matches by path and we can do get, post, put, delete...
//for get method it will look for index method which is inside defaultControllers.js
router.route('/')
    .get(defaultController.index)

router.route('/login')
    .get(defaultController.loginGet)
    .post(defaultController.loginPost)

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost)

module.exports = router;