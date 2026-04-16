const DB_Path = ''; // DB Cloud link

// Core
const path = require('path');

// External 
const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// Local
const rootDir = require('./utils/pathUtils');
const { storeRouter } = require('./Router/storeRouter');
const { hostRouter } = require('./Router/hostRouter');
const { authRouter } = require('./Router/authRouter');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());


const store = new MongoDBStore({
    uri : DB_Path,
    collection : 'sessions'
});



// Part Of Express that why return a Middleware.
app.use(session ({
    secret : "codewithHarry",
    saveUninitialized : true,
    resave : false,
    store: store
}));


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
        res.redirect('/login');
    }
});

app.use("/host", hostRouter);




app.use(express.static(path.join(rootDir, 'public')));


app.use((req, res, next) => {
    res.render('404', {pageTitle : 'page Not found', isLoggedIn : req.isLoggedIn});
});


const port = 3000;

mongoose.connect(DB_Path).then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log("Error during Connection", err);
});