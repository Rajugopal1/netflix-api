/**
 * @author Siddharth_Kumar_Yadav
 * @Since 07 Mar 2022
 */

const path = require("path");
const multer = require("multer");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb("Please enter valid PDF/PNG/JPEG Files ", false);
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const originalFilname = file.originalname.split(".")[0];

    if (req.isRandomNameofUpload === true) cb(null, uuidv4() + "." + extension);
    else cb(null, originalFilname + "." + extension);
  },
});

const uploadUtil = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { uploadUtil };
