// External Module
const express = require('express');
const app = express();
// Core Module
const path = require('path');

// Local Module
const rootDir = require('./utils/path_Utils');
const { hostRouter } = require('./Router/hostRouter');
const { storeRouter } = require('./Router/storeRouter');



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(hostRouter);
app.use(storeRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    res.render('404', {pageTitle : 'page Not Found'});
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});