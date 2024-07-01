// import services images
const {
  createImages,
  getAllImages,
  getOneImages,
  deleteImages,
} = require('../../../services/mongoose/images');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
  try {
    console.log('req.file');
    console.log(req.file);

    const result = await createImages(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllImages(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneImages(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteImages(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, find, destroy };
