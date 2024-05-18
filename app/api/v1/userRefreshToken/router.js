const express = require('express');
const router = express();
const { index } = require('./controller');
// const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");

router.get('/refresh-token/:refreshToken/:email', index);

module.exports = router;
