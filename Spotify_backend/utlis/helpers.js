const jwt = require("jsonwebtoken");

function getToken(email, user) {
  // Payload should use "id" not "identifier"
  const token = jwt.sign(
    { id: user._id, email },    // 👈 use id instead of identifier
    "thisKeyIsSupposedToSecret", // must match passport secret
    { expiresIn: "1d" }          // optional: token expiry
  );
  return token;
}

module.exports = { getToken };
