const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../model/Song");
const User = reqiure("../model/user");

router.post("/create", passport.authenticate("jwt", {session: false}),
 async (req, res) => {
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track) {
        return res 
            .status(301)
            .json({err: "Insufficient details to create song"});
    }


    const artist = req.user._id;
    const songDetails = {name, thumbnail, track, artist};
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
});

// Get route to get all songs i have published
router.get("/get/mysong", passport.authenticate("jwt", {session: false}),
 async(req, res) => {
  //  console.log("hi");

    const currentUser = req.user;
    const songs = await Song.find({artist: req.user._id});
    return res.status(200).json({data: songs});
 });

router.get("/get/artist",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const {artistId} = req.body;
        const artist = await User.find({_id: artistId});
        if(!artist) {
            return res.status(301).json({err: "Artist does not exist"});
        }
        const songs = await Song.find({artist:artistId});
        return res.status(200).json({data: songs});
    }
);

router.get(
    "/get/songname",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
          const {songName} = req.body;
        const songs = await Song.findOne({name:songName});
        return res.status(200).json({data: songs});
    }
 );

module.exports = router;