const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: String,
  year: Number,
  subject: String,
  difficulty: String,
  fileUrl: String,
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Paper', paperSchema);
