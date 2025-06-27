const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const paperRoutes = require('./routes/paperroutes');
const solutionRoutes = require('./routes/solutionroutes');
const cutoffRoutes = require('./routes/cutoffroutes');
const subjectRoutes = require('./routes/subjectroutes');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/papers', paperRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/cutoffs', cutoffRoutes);
app.use('/api/subjects', subjectRoutes);

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("DB connection error", err);
});

pip install django
