// npm init : package.json -- this is node project
// npm i express : expressJs package install hogya -- project came to know that we are using express
// We finally use express

const express = require("express");
const app = express(); 
const port = 5000;
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");  
// const User = require("./model/user");
const User = require("./model/user");  
const songRoutes = require("./routes/song");
const authRoutes = require("./routes/auth");
require("dotenv").config();

app.use(express.json());

// console.log(process.env);


//connect mongodb to our node app.
//mongoose.connect() takes 2 arguments : 1. which db to connect to (db url) 
mongoose.connect("mongodb+srv://gulshan26:" + 
    process.env.MONGO_PASSWORD +
    "@spotifyclone.znkado0.mongodb.net/?retryWrites=true&w=majority&appName=SpotifyClone",
     {
        useNewUrlParser: true,
        useUnifiedTopology: true
     }
    )
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log(err);
        console.log("Error while connecting to Mongo");
    });

//setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSupposedToSecret';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // usually JWT payload stores user _id, not "id"
        const user = await User.findById(jwt_payload.id);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

//API : GET type : / : return text "Hello world"
app.get("/", (req, res) => {
    // req contain all data for the request
    // res contain all data for the response
    res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);

// now we wamt to tell express that our server will run on localhost:5000
app.listen(port, () => {
    console.log("App is running on port" + port);
});