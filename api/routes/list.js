const router = require('express').Router();
const listController = require("../controller/listController");
const verifyAuth = require("../middleware/verifyAuth");
const { paramsId, headerUserId } = require("../middleware/objectId");

/**
 * List routes
 */

router.post('/list', [verifyAuth], listController.postList);

router.get('/list', listController.getAllLists);

router.delete('/list/:id', [verifyAuth, paramsId, headerUserId], listController.deleteList);


module.exports = router;