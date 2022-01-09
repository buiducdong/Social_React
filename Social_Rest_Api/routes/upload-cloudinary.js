const router = require("express").Router();
const fileUploader = require("../config/cloudinary");

router.post("/", fileUploader.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  try {
    res.json({ secure_url: req.file.path });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
