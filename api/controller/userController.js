const User = require("../models/user");
const CryptoJS = require("crypto-js");

/**
 * todo Update user profile
 */
const updateProfile = async (req, res) => {

    const userId = req.params.id;
    const userDeatails = req.body;

    const hashedPassword = CryptoJS.AES.encrypt(userDeatails.password, "secret key 123").toString();
    userDeatails.password = hashedPassword;
    try {
        const user = await User.findByIdAndUpdate(userId, userDeatails, {
            new: true,
        });

        res.send({
            message: "User updated successfully",
            status: 200,
            user,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

/**
 * todo logedin user
 */
const loggedInUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).select("-password");
        res.send({
            message: "User found successfully",
            status: 200,
            user,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find().select("-password");
        res.send({
            message: "Users found successfully",
            status: 200,
            users,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const userStats = async (req, res) => {

    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    const monthArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const dataArray = [];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]._id);
            // console.log(data[i].total)
            dataArray.push({
                month: monthArray[data[i]._id - 1],
                total: data[i].total,
            });
        }
        
        res.send({
            sucess : true,
            stats : dataArray,
        });
        
    } catch (err) {
        res.status(500).json(err);
    }

}

module.exports = {
    updateProfile,
    loggedInUser,
    getAllUsers,
    userStats
};