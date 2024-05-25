// kegiatan
const Events = require('../../api/v1/events/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingTalents } = require('./talents');

const createEvents = async (req, res) => {
  const { name, description, event_status, location, talentID, schedules } =
    req.body;

  await checkingTalents(talentID);

  if (!name && !description) {
    throw new BadRequestError('Nama dan deskripsi harus diisi');
  }

  const result = await Events.create({
    name,
    description,
    event_status,
    location,
    talentID,
    schedules,
  });

  return result;
};

const getAllEvents = async (req) => {
  const { keyword, speakerID } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (speakerID) {
    condition = { ...condition, talentID: talentID };
  }

  const result = await Events.find(condition).populate({
    path: 'talentID',
    select: '_id name email avatar no_telp role',
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id }).populate({
    path: 'talentID',
    select: '_id name email avatar no_telp role',
  });

  if (!result) throw new NotFoundError(`Tidak ada kegiatan dengan id :  ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const { name, description, event_status, location, talentID, schedules } =
    req.body;

  const check = await Events.findOne({
    name,
    description,
    event_status,
    location,
    talentID,
    schedules,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Kegiatan sudah terdaftar');

  const result = await Events.findOneAndUpdate(
    { _id: id },
    { name, description, event_status, location, talentID, schedules },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kegiatan dengan id :  ${id}`);

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kegiatan dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingEvents = async (id) => {
  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kegiatan dengan id :  ${id}`);

  return result;
};

module.exports = {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  checkingEvents,
};
