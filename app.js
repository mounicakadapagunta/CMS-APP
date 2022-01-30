const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
// import { engine } from 'express-handlebars';
// import { handlebars } from 'hbs';
const { mongoDbUrl, PORT, globalVariables } = require('./config/configuration')
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
/*===============DB CONNECTION==========================*/
//configure mongoose to connect to MongoDB 
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log('Mongoose connected successfully');

    }).catch(err => {
        console.log('Error connecting to MongoDB')
    });



/*=================EXPRESS CONFIG=======================*/
/* configure express */
app.use(express.json());
//passing a configurational object in the express.urlencoded
app.use(express.urlencoded({ extended: true }));
//to match the paths of public folder
app.use(express.static(path.join(__dirname, 'public')))

/*flash and session */
app.use(session({
    secret: 'any secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

app.use(globalVariables)







/*==================VIEW ENGINE SETUP=====================*/

//*setup view engine to use handle bars */
app.engine('handlebars', exphbs.engine({ defaultLayout: "default" }))
app.set('view engine', 'handlebars');


/*=================ROUTES========================*/
/*routes - taking connection from rotues-default-defaultRoutes.js*/
const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes)


/*=================PORT DETAILS=========================*/
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})