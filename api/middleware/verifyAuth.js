const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/**
 * ? verifyAuth middleware
 * ! This middleware is used to verify the user token
 */

const verifyAuth = async (req, res, next) => {

    const authHeader = req.header("x-auth-token") || req.header("authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, 'secret key 123', (err, user) => {
        if (err) res.status(403).json({message:"Token is not valid!"});
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({message :"You are not authenticated!"});
    }
}

module.exports = verifyAuth;