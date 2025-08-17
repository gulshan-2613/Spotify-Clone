const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utlis/helpers");

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    // Step 1: check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "A user with this email already exists" });
    }

    // Step 2: hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: create new user
    const newUserData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    };
    const newUser = await User.create(newUserData);

    // Step 4: generate token
    const token = getToken(email, newUser);

    // Step 5: return user without password
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    // Step 2: validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    // Step 3: generate token
    const token = getToken(user.email, user);

    // Step 4: return user without password
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
