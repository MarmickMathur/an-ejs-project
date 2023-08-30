const express = require("express");
const appError = require("../appError");
const Doc = require("../models/documents");
const isowner = require("../middleware/isowner");
const isloggedin = require("../middleware/isloggedin");
const validator = require("../middleware/documentValidator");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const {
  loaddocuments,
  adddocument,
  viewdocument,
  editdocument,
  updatedocument,
  deletedocument,
} = require("../controllers/docucontrollers");
const router = express.Router({ mergeParams: true });

// router.get("/", isloggedin, loaddocuments);

// router.post("/", isloggedin, validator, adddocument);
router
  .route("/")
  .get(isloggedin, loaddocuments)
  .post(isloggedin, upload.array("images"), validator, adddocument);

router.get("/add", isloggedin, (req, res) => {
  res.render("documents/adddocument");
});

router.get("/:id/edit", isloggedin, isowner, editdocument);

router
  .route("/:id")
  .get(isloggedin, isowner, viewdocument)
  .put(isloggedin, isowner, upload.array("images"), validator, updatedocument)
  .delete(isloggedin, isowner, deletedocument);

// router.get("/:id", isloggedin, isowner, viewdocument);
// router.put("/:id", isloggedin, isowner, validator, updatedocument);

// router.delete("/:id", isloggedin, isowner, deletedocument);

module.exports = router;
