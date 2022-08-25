const router = require('express').Router();
const movieController = require("../controller/movieController");
const verifyAuth = require("../middleware/verifyAuth");
const { paramsId, headerUserId } = require("../middleware/objectId");

/**
 * * movie routes
 */

router.post('/movie', [verifyAuth], movieController.postMovie);

router.get('/movie', movieController.getAll);

router.get('/movie/random', movieController.getAllRandom);

router.get('/movie/:id', [verifyAuth, paramsId], movieController.getById);

router.patch('/movie/:id', [verifyAuth, paramsId, headerUserId], movieController.updateMovie);

router.delete('/movie/:id', [verifyAuth, paramsId, headerUserId], movieController.deleteMovie);

module.exports = router;

