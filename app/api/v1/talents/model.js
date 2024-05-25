const mongoose = require('mongoose');

let talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
      minlength: 3,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },
    no_telp: {
      type: String,
      required: [true, 'Nomor Telepon harus diisi'],
      maxlength: 13,
    },
    role: {
      type: String,
      default: 'talent',
      required: [true, 'Role harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Talent', talentSchema);
