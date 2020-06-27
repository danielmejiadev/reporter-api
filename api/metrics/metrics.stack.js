/**
 * Custom data type to store metrics and the values.
 * Also expose the basic operations to manipulate data.
 * @returns {*} The stack operations.
 */
function MetricsStack() {
  const store = {};

  function values(metricKey) {
    return store[metricKey] || [];
  }

  function push(metricKey, metric) {
    const metricValues = values(metricKey);
    return store[metricKey] = [metric, ...metricValues];
  }

  function flush(metricKey) {
    store[metricKey] = [];
  }

  return {
    values,
    push,
    flush,
  }
}

module.exports = MetricsStack();