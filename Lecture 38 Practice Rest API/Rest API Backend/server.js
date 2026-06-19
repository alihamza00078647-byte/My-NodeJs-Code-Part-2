// DB Connection
const Mongo_URL = 'mongodb+srv://alihamza00078647:Zaraki123@cluster0.ebzjodg.mongodb.net/todo?appName=Cluster0';

// Core Module
const path = require('path');

// External Module
const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const cors = require('cors');

// Local Module
const rootDir = require('./utils/pathUtils');
const  todoItemsRouter  = require('./Router/todoItemsRouter');


app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/api/todo', todoItemsRouter);











app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next) => {
    res.status(422).json({ message : "Page Not Found"});
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