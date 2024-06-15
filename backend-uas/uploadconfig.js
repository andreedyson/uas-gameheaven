const multer = require("multer");
const path = require("path");
const MAX_SIZE = 20000000;
const fs = require("fs");
const cr = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const randString = cr.randomBytes(8).toString("hex").toLocaleUpperCase();
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, `${Date.now()}-${randString}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE,
  },
});

const deleteImage = async (filename) => {
  const filepath = path.join(__dirname, "upload", filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(`Error deleting file: ${filepath}`);
    } else {
      console.log(`File deleted successfully`);
    }
  });
};

module.exports = { upload, deleteImage };
