const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/");
  },
  filename(req, file, callback) {
    const extension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${extension}`;
    callback(null, uniqueFilename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("허용되지 않는 파일 유형"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

module.exports = upload;
