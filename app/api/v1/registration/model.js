const mongoose = require('mongoose');

let registrationSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentID: {
      type: mongoose.Types.ObjectId,
      ref: 'UploadDocument',
      required: true,
    },
    eventID: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
