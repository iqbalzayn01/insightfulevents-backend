const Events = require('../../api/v1/events/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingSpeakers } = require('./speakers');

const createEvents = async (req, res) => {
  const { name, description, event_status, location, speakerID, schedules } =
    req.body;

  await checkingSpeakers(speakerID);

  if (!name && !description) {
    throw new BadRequestError('Nama dan deskripsi harus diisi');
  }

  const result = await Events.create({
    name,
    description,
    event_status,
    location,
    speakerID,
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
    condition = { ...condition, speakerID: speakerID };
  }

  const result = await Events.find(condition).populate({
    path: 'speakerID',
    select: '_id name email avatar no_telp role',
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id }).populate({
    path: 'speakerID',
    select: '_id name email avatar no_telp role',
  });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id :  ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const { name, description, event_status, location, schedules } = req.body;

  const check = await Events.findOne({
    name,
    description,
    event_status,
    location,
    schedules,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Event sudah terdaftar');

  const result = await Events.findOneAndUpdate(
    { _id: id },
    { name, description, event_status, location, schedules },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada event dengan id :  ${id}`);

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
