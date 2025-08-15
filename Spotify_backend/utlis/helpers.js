const jwt = require("jsonwebtoken");

exports = {}

exports.getToken = async(email,user) => {
    //Assume this code is complete
    // console.log(user);
    const token = jwt.sign({identifier: user._id}, "thisKeyIsSupposedToSecret");
    return token;
};

module.exports = exports