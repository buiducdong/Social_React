const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "bonba",
  api_key: "571624534113137",
  api_secret: "6ARNWqbHmoFzSbJ0Q7Vh-Rcfjeg",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "social-react",
    public_id: (req, file, cb) => req.body.name,
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
