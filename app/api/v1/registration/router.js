const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-registration',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  create
);

router.get('/registration', authenticateUser, authorizeRoles('admin'), index);

router.get(
  '/registration/:id',
  authenticateUser,
  authorizeRoles('admin'),
  find
);

router.put(
  '/registration/:id',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  update
);

router.delete(
  '/registration/:id',
  authenticateUser,
  authorizeRoles('admin'),
  destroy
);

module.exports = router;
