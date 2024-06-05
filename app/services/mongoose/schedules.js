// Jadwal
const Schedules = require('../../api/v1/schedules/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingTalents } = require('./talents');
const { checkingEvents } = require('./events');

const createSchedules = async (req, res) => {
  const { schedules, talentID, eventID } = req.body;

  await checkingTalents(talentID);
  await checkingEvents(eventID);

  if (!schedules) {
    throw new BadRequestError('Jadwal harus diisi');
  }

  const result = await Schedules.create({
    schedules,
    talentID,
    eventID,
  });

  return result;
};

module.exports = {
  createSchedules,
};
