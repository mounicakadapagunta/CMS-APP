module.exports = {
    index: (req, res) => {
        res.render('default/index')
    },

    loginGet: (req, res) => {
        res.render('default/login')
    },
    loginPost: (req, res) => {
        res.render('admin')
    },
    registerGet: (req, res) => {
        res.render('default/register')
    },
    registerPost: (req, res) => {
        res.render('admin')
    }
}
