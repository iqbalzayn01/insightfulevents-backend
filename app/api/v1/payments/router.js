const express = require('express');
const router = express();
const { create, index, find } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-payments',
  authenticateUser,
  authorizeRoles('admin', 'peserta'),
  create
);

router.get('/payments', authenticateUser, authorizeRoles('admin'), index);
router.get('/payments/:id', authenticateUser, authorizeRoles('admin'), find);

module.exports = router;
