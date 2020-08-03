const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads');
  },
  filename: (_req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`);
  },
});

const filter = (_req, file, cb) => {
  if (
    file.mimetype === 'text/csv' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'video/mp4'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerLoader = (fields) => {
  return multer({ storage: fileStorage, fileFilter: filter }).fields(fields);
};

module.exports = multerLoader;
