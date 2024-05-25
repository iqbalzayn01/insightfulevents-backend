const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UploadDocument', uploadSchema);
