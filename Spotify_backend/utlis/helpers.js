const jwt = require("jwt");

exports = {}

exports.getToken = async() => {
    //Assume this code is complete
    const token = jwt.sign({identifier: user._id});
    return token;
};

module.exports = exports