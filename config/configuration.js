module.exports = {
    mongoDbUrl: 'mongodb+srv://gautham:gautham@blog.jcckq.mongodb.net',
    PORT: process.env.PORT || 3000,
    //this willl act as middleware and we will use all over our project
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');

        next();
    }
};