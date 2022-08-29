const router = require("express").Router();
const listController = require("../controller/listController");
const verifyAuth = require("../middleware/verifyAuth");
const { paramsId, headerUserId } = require("../middleware/objectId");
const { uploadUtil } = require("../utils/helper");
const fileUpload = require("../controller/fileUpload");
const { check, body } = require("express-validator");

/**
 * List routes
 */

router.post("/list", [verifyAuth], listController.postList);

router.post(
  "/uploads",
  verifyAuth,
  check("attachments")
    .if(body("attachments").exists())
    .notEmpty()
    .withMessage("Please enter pdf files files"),
  uploadUtil.array("attachments"),
  fileUpload.uploadDocController
);

router.get("/list", listController.getAllLists);

router.delete(
  "/list/:id",
  [verifyAuth, paramsId, headerUserId],
  listController.deleteList
);

module.exports = router;
