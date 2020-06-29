// Dependencies
const express = require('express');
const router = express.Router();

// Controller
const metricController = require('./metrics.controller');

/**
 * @swagger
 *
 * definitions:
 *   MetricRequest:
 *     type: object
 *     required:
 *       - value
 *     properties:
 *       value:
 *         type: number
 */

/**
 * @swagger
 *
 * /metric/{metricKey}/sum:
 *   get:
 *     description: Gets the sum of metrics by last hour
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: metricKey
 *         description: The metric key.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The sum of values for given metric
 */
router.get('/:metricKey/sum', metricController.getMetricSum);

/**
 * @swagger
 *
 * /metric/{metricKey}:
 *   post:
 *     description: Add a new value for the given metric
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: metricKey
 *         description: The metric key.
 *         in: path
 *         required: true
 *         type: string
 *       - name: requestObject
 *         description: Request object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/MetricRequest'
 *     responses:
 *       200:
 *         description: The response
 */
router.post('/:metricKey', metricController.createMetric);

module.exports = router;