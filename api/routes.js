// Dependencies
const express = require('express');
const router = express.Router();

// Routes
const metricRouter = require('./metrics/metrics.router');
router.use('/metric', metricRouter);

module.exports = router;