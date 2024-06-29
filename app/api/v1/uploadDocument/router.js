const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const upload = require('../../../middlewares/multer');

router.post(
  '/upload-documents',
  upload.single('file'),
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  create
);

router.get(
  '/documents',
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  index
);

router.get(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  find
);

router.put(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  update
);

router.delete(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  destroy
);

module.exports = router;
