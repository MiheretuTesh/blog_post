const express = require('express');
const importData = require('./data.json');
const app = express();

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hellow World");
});

app.get("/players", (req, res) => {
    res.send(importData);
});


app.listen(PORT, (req, res) => {console.log("listening on port ${PORT}")})