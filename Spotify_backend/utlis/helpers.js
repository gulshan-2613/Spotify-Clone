const jwt = require("jsonwebtoken");

exports = {}

exports.getToken = async() => {
    //Assume this code is complete
    const token = jwt.sign({identifier: user._id}, "thisKeyIsSupposedToSecret");
    return token;
};

module.exports = exports