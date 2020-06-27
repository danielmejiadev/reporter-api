// Under test
const metricsController = require('../metrics.controller');
const metricsService = require('../metrics.service');

describe('MetricsController', () => {
  const mockStatus = {
    json: jest.fn(),
  }
  const response = {
    status: jest.fn().mockReturnValue(mockStatus),
  };

  afterEach(() => jest.clearAllMocks());

  it('should get metrics sum', () => {
    const metricKey = 'key';
    const request = {
      params: {
        metricKey,
      }
    };

    const metric = { value: 1, created: new Date() };
    const metric2 = { value: 2, created: new Date() };
    jest.spyOn(metricsService, 'getMetrics').mockReturnValue([metric, metric2]);

    metricsController.getMetricSum(request, response);
    expect(metricsService.getMetrics).toHaveBeenCalledWith(metricKey);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(mockStatus.json).toHaveBeenCalledWith({ value: 3 });
  });

  it('should create metric', () => {
    const metricKey = 'key';
    const value = 10;
    const request = {
      body: {
        value,
      },
      params: {
        metricKey,
      }
    };

    jest.spyOn(metricsService, 'createMetric').mockImplementation();

    metricsController.createMetric(request, response);
    expect(metricsService.createMetric).toHaveBeenCalledWith(metricKey, value);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(mockStatus.json).toHaveBeenCalledWith({});
  });
});