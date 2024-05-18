const Speakers = require('../../api/v1/speakers/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createSpeakers = async (req, res) => {
  const { name, email, avatar, no_telp, role } = req.body;

  if (!name || !email) {
    throw new BadRequestError('Nama atau Email harus diisi');
  }

  const result = await Speakers.create({
    name,
    email,
    avatar,
    no_telp,
    role,
  });

  return result;
};

const getAllSpeakers = async (req) => {
  const result = await Speakers.find();

  return result;
};

const getOneSpeakers = async (req) => {
  const { id } = req.params;

  const result = await Speakers.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  return result;
};

const updateSpeakers = async (req) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const check = await Speakers.findOne({
    name,
    email,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Pembicara sudah terdaftar');

  const result = await Speakers.findOneAndUpdate(
    { _id: id },
    { name, email },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  return result;
};

const deleteSpeakers = async (req) => {
  const { id } = req.params;

  const result = await Speakers.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createSpeakers,
  getAllSpeakers,
  getOneSpeakers,
  updateSpeakers,
  deleteSpeakers,
};
