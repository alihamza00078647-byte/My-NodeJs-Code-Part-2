// DB Connection
const Mongo_URL = ''; // Add Your MongoDB URL Here

// Core Module
const path = require('path');

// External Module
const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);




// Local Module
const rootDir = require('./utils/pathUtils');
const { authRouter } = require('./Router/authRouter');
const { hostRouter } = require('./Router/hostRouter');
const { storeRouter } = require('./Router/storeRouter');
const { default: mongoose } = require('mongoose');



app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded());


const store = new MongoDBStore({
    uri : Mongo_URL,
    collection : "sampleSession"
});



app.use(session ({
    secret : "Secret Code",
    saveUninitialized : true,
    resave : false,
    store : store
}))


app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
});


app.use(authRouter);
app.use(storeRouter);


app.use('/host', (req, res, next) => {
    if (req.isLoggedIn){
        next();
    } else {
        return res.redirect('/login');
    }
});

app.use('/host', hostRouter);




app.use(express.static(path.join(rootDir, 'public')));


app.use((req, res, next) => {
    res.render('404page', {pageTitle : 'page Not found', isLoggedIn : req.isLoggedIn});
});

const port = 3000;


mongoose.connect(Mongo_URL).then(() => {
    console.log("DB is Connected");
    app.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.log('Error During Connecting To DB', err);
});