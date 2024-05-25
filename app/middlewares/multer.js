const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/documents/');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    // Reject file
    cb(
      {
        message:
          'Unsupported file format. Allowed formats: JPEG, JPG, PNG, PDF, DOC, DOCX',
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 25000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
