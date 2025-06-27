const mongoose = require('mongoose');

const cutoffSchema = new mongoose.Schema({
  year: Number,
  category: String,
  cutoffMarks: Number
});

module.exports = mongoose.model('Cutoff', cutoffSchema);
