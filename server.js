const express = require('express');
const importData = require('./data.json');
const app = express();
const connectDB = require('./db');
const dotenv = require('dotenv');


dotenv.config();

//connect to database
connectDB();


let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hellow World");
});

app.get("/players", (req, res) => {
    res.send(importData);
});

const server = app.listen(3000, ()=>{
    console.log(`server is running on port ${PORT}`);
})

// app.listen(PORT, (req, res) => {console.log(`listening on port ${PORT}`)})


// https://git.heroku.com/blogpostnodeapinewapp.git

//https://blogpostnodeapinewapp.herokuapp.com/