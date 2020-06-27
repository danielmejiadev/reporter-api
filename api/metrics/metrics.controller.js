// Services
const metricsService = require('./metrics.service');

/**
 * Rest API handler for get metric sum values.
 * @param {*} request The http request object.
 * @param {*} response The http response object.
 */
exports.getMetricSum = function(request, response) {
  const { params } = request;
  const { metricKey } = params;
  const metricsSum = metricsService
    .getMetrics(metricKey);
    //.reduce((sum, metric) => sum + metric.value, 0);

  return response
    .status(200)
    .json({ value: metricsSum });
}

/**
 * Rest API handler to create a new metric.
 * @param {*} request The http request object.
 * @param {*} response The http response object.
 */
exports.createMetric = function(request, response) {
  const { body, params } = request;
  metricsService.createMetric(params.metricKey, body.value);

  return response
    .status(200)
    .json({});
}