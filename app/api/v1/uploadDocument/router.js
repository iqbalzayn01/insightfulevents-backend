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
  authorizeRoles('admin', 'user'),
  create
);

router.get('/documents', authenticateUser, authorizeRoles('admin'), index);

router.get(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  find
);

router.put(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  update
);

router.delete(
  '/documents/:id',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  destroy
);

module.exports = router;
