const router = require('express').Router();
const userController = require("../controller/userController");
const verifyAuth = require("../middleware/verifyAuth");
const { paramsId, headerUserId } = require("../middleware/objectId");
/**
 * * user routes
 */
router.patch('/update/:id', [verifyAuth, paramsId, headerUserId], userController.updateProfile);

router.get('/loggedInUser', [verifyAuth, headerUserId], userController.loggedInUser);

router.get('/AllUsers', [verifyAuth, headerUserId], userController.getAllUsers);

router.get('/stats', verifyAuth, userController.userStats);

module.exports = router;