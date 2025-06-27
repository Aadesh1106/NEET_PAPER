const Paper = require('../models/paper');

exports.getAllPapers = async (req, res) => {
  const filters = req.query;
  const papers = await Paper.find(filters);
  res.json(papers);
};

exports.getPaperById = async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  res.json(paper);
};

exports.createPaper = async (req, res) => {
  const paper = new Paper(req.body);
  await paper.save();
  res.status(201).json(paper);
};
