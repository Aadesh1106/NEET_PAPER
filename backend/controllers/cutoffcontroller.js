const Cutoff = require('../models/cutoff');

// Get all cutoff entries
exports.getAllCutoffs = async (req, res) => {
  try {
    const cutoffs = await Cutoff.find();
    res.json(cutoffs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cutoffs', error });
  }
};

// Add a cutoff record
exports.createCutoff = async (req, res) => {
  try {
    const cutoff = new Cutoff(req.body);
    await cutoff.save();
    res.status(201).json(cutoff);
  } catch (error) {
    res.status(500).json({ message: 'Error saving cutoff', error });
  }
};

// Get cutoff by year
exports.getCutoffByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const cutoffs = await Cutoff.find({ year });
    res.json(cutoffs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cutoff by year', error });
  }
};
