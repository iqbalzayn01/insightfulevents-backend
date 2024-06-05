const express = require('express');
const router = express();
//  index, find, update, destroy
const { create } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-schedules',
  authenticateUser,
  authorizeRoles('admin'),
  create
);

// router.get('/schedules', authenticateUser, authorizeRoles('admin'), index);

// router.get('/schedules/:id', authenticateUser, authorizeRoles('admin'), find);

// router.put('/schedules/:id', authenticateUser, authorizeRoles('admin'), update);

// router.delete(
//   '/schedules/:id',
//   authenticateUser,
//   authorizeRoles('admin'),
//   destroy
// );

module.exports = router;
