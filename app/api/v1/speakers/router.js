const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-speakers',
  authenticateUser,
  authorizeRoles('admin'),
  create
);

router.get('/speakers', authenticateUser, authorizeRoles('admin'), index);

router.get('/speakers/:id', authenticateUser, authorizeRoles('admin'), find);

router.put('/speakers/:id', authenticateUser, authorizeRoles('admin'), update);

router.delete(
  '/speakers/:id',
  authenticateUser,
  authorizeRoles('admin'),
  destroy
);

module.exports = router;
