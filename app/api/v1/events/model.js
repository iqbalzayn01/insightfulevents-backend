const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Nama kegiatan harus diisi'],
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Deskripsi harus diisi'],
    },
    event_status: {
      type: String,
      enum: ['offline', 'online'],
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Deskripsi harus diisi'],
      minlength: 2,
      maxlength: 100,
    },
    talentID: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
    schedules: [
      {
        start_time: {
          type: Date,
          required: [true, 'Waktu mulai harus diisi'],
        },
        end_time: {
          type: Date,
          required: [true, 'Waktu selesai harus diisi'],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
