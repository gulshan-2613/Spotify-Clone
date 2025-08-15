const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const {getToken} = require("../utlis/helpers");

//This post route will help to register a user
router.post("/register", async(req, res) => {

    // This code is run when the /register api is called as a POST request

    // My req.body will be of the format {email, password, firstname, lastnmae, username}
    const {email, password, firstName, lastName, username} = req.body;

    //Sep 2: Does a user with this email already exist? If yes, we throw an error.
    const user = await User.findOne({email: email});
    if(user) {
        // status code by default is 200
        return res
             .status(403)
             .json({error: "A user with this email already exists"});
    }
    // This is valid request

    //Step 3: Create a new user in the DB
    //Step 3.1: We not store password in plain text.
    //xyz: We convert the plain text password to a hash.
    const hashedPassword = bcrypt.hash(password, 10);
    const newUserData = {email, password: hashedPassword,
         firstName,
         lastName,
         username};
    const newUser = await User.create(newUserData);

    //Step 4: We want to create the token to return to the user
    const token = await getToken(email, newuser);

    //Step 5: return the result to the user
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;