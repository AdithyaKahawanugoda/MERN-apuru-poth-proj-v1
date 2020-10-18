const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File is not supported"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
