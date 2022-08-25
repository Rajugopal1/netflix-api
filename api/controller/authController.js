const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/**
 * TODO Register a new user
 */
const register = async (req, res) => {

    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            "secret key 123"
        ).toString(),
        profilePic: req.body.profilePic,
        isAdmin: req.body.isAdmin,
    });

    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const userData = await newUser.save();

        return res.send({
            message: "User created successfully",
            status: 200,
            user: userData,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * TODO Login a user
 */
const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }


        const isPasswordValid = CryptoJS.AES.decrypt(
            user.password,
            "secret key 123"
        ).toString(CryptoJS.enc.Utf8);


        if (isPasswordValid !== password) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }



        const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin}, "secret key 123");
        res.status(200).json({
            message: "User logged in successfully",
            user,
            token,

        });
    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = { register, login };
