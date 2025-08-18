const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  likedPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  subscribedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// ✅ Use existing model if already compiled
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = UserModel;
