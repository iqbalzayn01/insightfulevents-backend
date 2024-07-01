const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const createImages = async (req) => {
  if (!req.file || !req.file.filename) {
    throw new Error('File upload is required');
  }

  const result = await Images.create({
    fileName: `uploads/images/${req.file.filename}`,
  });

  return result;
};

const getAllImages = async (req) => {
  const result = await Images.find();

  return result;
};

const getOneImages = async (req) => {
  const { id } = req.params;

  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id :  ${id}`);

  return result;
};

const deleteImages = async (req) => {
  const { id } = req.params;

  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id :  ${id}`);

  return result;
};

module.exports = {
  createImages,
  getAllImages,
  getOneImages,
  deleteImages,
  checkingImage,
};
