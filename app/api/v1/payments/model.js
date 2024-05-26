const mongoose = require('mongoose');
const Registration = require('../registration/model');
const Event = require('../events/model');

let paymentSchema = new mongoose.Schema(
  {
    registrationID: {
      type: mongoose.Types.ObjectId,
      ref: 'Registration',
      required: true,
    },
    total_payment: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

paymentSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('registrationID')) {
    try {
      const registration = await Registration.findById(
        this.registrationID
      ).populate('eventID');
      if (!registration) {
        throw new Error('Registration not found');
      }
      const event = await Event.findById(registration.eventID);
      if (!event) {
        throw new Error('Event not found');
      }
      this.total_payment = event.price;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
