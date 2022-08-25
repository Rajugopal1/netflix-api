const User = require("../models/user");


/**
 * ! Is Admin middleware
 */

const isAdmin = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
        return res.status(400).json({
            message: "User does not exist",
        });
        }
        if (user.isAdmin) {
        next();
        } else {
        return res.status(403).json({
            message: "You are not authorized to perform this action",
        });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = isAdmin;