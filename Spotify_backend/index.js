// npm init : package.json -- this is node project
// npm i express : expressJs package install hogya -- project came to know that we are using express
// We finally use express

const express = require("express");
const app = express(); 
const port = 5000;

//API : GET type : / : return text "Hello world"
app.get("/", (req, res) => {
    // req contain all data for the request
    // res contain all data for the response
    res.send("Hello World");
});

// now we wamt to tell express that our server will run on localhost:5000
app.listen(port, () => {
    console.log("App is running on port" + port);
});