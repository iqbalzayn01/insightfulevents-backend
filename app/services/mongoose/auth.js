const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
const { createUserRefreshToken } = require('./userRefreshToken');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  let role = result.role;
  const tokenPayload = createTokenUser(result);
  const token = createJWT({ payload: tokenPayload });
  const refreshToken = createRefreshJWT({ payload: tokenPayload });

  if (role === 'admin' || role === 'user') {
    await createUserRefreshToken({ refreshToken, user: result._id });
  }

  return {
    token,
    refreshToken,
    email: result.email,
    role: result.role,
  };
};

module.exports = { signin };
