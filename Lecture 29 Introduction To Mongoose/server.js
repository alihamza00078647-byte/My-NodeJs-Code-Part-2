// Core
const path = require('path');

// External 
const express = require('express');
const app = express();

// Local
const rootDir = require('./utils/pathUtils');
const { storeRouter } = require('./Router/storeRouter');
const { hostRouter } = require('./Router/hostRouter');
const { default: mongoose } = require('mongoose');


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);


app.use(express.static(path.join(rootDir, 'public')));



const port = 3000;
const DB_Path = ""; // Paste the URL of mongoCloud

mongoose.connect(DB_Path).then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log("Error during Connection", err);
});