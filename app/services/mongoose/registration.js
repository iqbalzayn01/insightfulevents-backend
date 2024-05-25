// Pendaftaran Kegiatan
const Registration = require('../../api/v1/registration/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingEvents } = require('./events');
const { checkingDocuments } = require('./uploadDocument');

const createRegistration = async (req, res) => {
  const { userID, documentID, eventID, registrationDate } = req.body;

  await checkingUsers(userID);
  await checkingDocuments(documentID);
  await checkingEvents(eventID);

  if (!userID && !eventID) {
    throw new BadRequestError('userID dan eventID harus diisi');
  }

  const result = await Registration.create({
    userID,
    documentID,
    eventID,
    registrationDate,
  });

  return result;
};

const getAllRegistration = async (req) => {
  const { keyword, userID, documentID, eventID } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (userID) {
    condition = { ...condition, userID: userID };
  }

  if (documentID) {
    condition = { ...condition, documentID: documentID };
  }

  if (eventID) {
    condition = { ...condition, eventID: eventID };
  }

  const result = await Registration.find(condition)
    .populate({
      path: 'userID',
      select: '_id name email avatar role',
    })
    .populate({
      path: 'documentID',
      select: '_id fileName',
    })
    .populate({
      path: 'eventID',
      select: '_id name description event_status location talentID schedules',
    });

  return result;
};

const getOneRegistration = async (req) => {
  const { id } = req.params;

  const result = await Registration.findOne({ _id: id })
    .populate({
      path: 'userID',
      select: '_id name email avatar role',
    })
    .populate({
      path: 'documentID',
      select: '_id fileName',
    })
    .populate({
      path: 'eventID',
      select: '_id name description event_status location talentID schedules',
    });

  if (!result)
    throw new NotFoundError(`Tidak ada pendaftaran dengan id :  ${id}`);

  return result;
};

const updateRegistration = async (req) => {
  const { id } = req.params;
  const { userID, documentID, eventID, registrationDate } = req.body;

  const check = await Registration.findOne({
    userID,
    documentID,
    eventID,
    registrationDate,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Pendaftaran sudah terdaftar');

  const result = await Registration.findOneAndUpdate(
    { _id: id },
    { userID, documentID, eventID, registrationDate },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada pendaftaran dengan id :  ${id}`);

  return result;
};

const deleteRegistration = async (req) => {
  const { id } = req.params;

  const result = await Registration.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pendaftaran dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createRegistration,
  getAllRegistration,
  getOneRegistration,
  updateRegistration,
  deleteRegistration,
};
