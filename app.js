const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1';
// Router
const authCMSRouter = require('./app/api/v1/auth/router');
const usersRouter = require('./app/api/v1/users/router');
const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router');
const talentsRouter = require('./app/api/v1/talents/router');
const eventsRouter = require('./app/api/v1/events/router');
const registrationRouter = require('./app/api/v1/registration/router');
const uploadDocumentRouter = require('./app/api/v1/uploadDocument/router');
const paymentsRouter = require('./app/api/v1/payments/router');

// Middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome to API SkillSync`,
  });
});

// App Router
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, usersRouter);
app.use(`${v1}/cms`, userRefreshTokenRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, registrationRouter);
app.use(`${v1}/cms`, uploadDocumentRouter);
app.use(`${v1}/cms`, paymentsRouter);

// App Middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
