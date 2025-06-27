const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  questionNumber: Number,
  solutionText: String
});

module.exports = mongoose.model('Solution', solutionSchema);
