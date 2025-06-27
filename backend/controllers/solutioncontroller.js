const Solution = require('../models/solution');

// Get all solutions for a paper
exports.getSolutionsByPaperId = async (req, res) => {
  try {
    const { paperId } = req.params;
    const solutions = await Solution.find({ paperId });
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching solutions', error });
  }
};

// Add a solution
exports.createSolution = async (req, res) => {
  try {
    const solution = new Solution(req.body);
    await solution.save();
    res.status(201).json(solution);
  } catch (error) {
    res.status(500).json({ message: 'Error saving solution', error });
  }
};
