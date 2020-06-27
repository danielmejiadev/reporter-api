// Dependencies
const moment = require('moment');

// Stack
const metricsStack = require('./metrics.stack');

/**
 * Check if dates have less than one hours between them.
 * @param { Date } newest The first date to compare.
 * @param { Date } oldest The second date to compare.
 */
exports.isLessThanAnHour = function (newest, oldest) {
  const anHourAgo = moment(newest).subtract(1, 'hours');
  return moment(oldest).isSameOrAfter(anHourAgo)
}

/**
 * Validate the metrics and flush if are oldest than one hour compare to date.
 * @param { string } metricKey The metric identifier.
 * @param { Date } date The date to comparate 
 */
exports.flushOldData = function (metricKey, date) {
  const [lastMetric] = metricsStack.values(metricKey);
  const areOldValues = lastMetric && !exports.isLessThanAnHour(date, lastMetric.createdAt);

  if (areOldValues) {
    metricsStack.flush(metricKey);
  }
}

/**
 * Gets the metrics for given key.
 * @param { string } metricKey The metric identifier.
 * @returns { Array } The list of values for given metric.
 */
exports.getMetrics = function (metricKey) {
  const now = Date.now();
  exports.flushOldData(metricKey, now);

  return metricsStack
    .values(metricKey)
    .filter((metric) => exports.isLessThanAnHour(now, metric.createdAt));
}

/**
 * Create a metric associate to given key.
 * @param { string } metricKey The metric identifier.
 * @param { number } value The value to add.
 */
exports.createMetric = function (metricKey, value) {
  const metricToSave = { value: Math.round(value), createdAt: Date.now() };
  exports.flushOldData(metricKey, metricToSave.createdAt);

  metricsStack.push(metricKey, metricToSave);
}
