// Under test
const metricsService = require('../metrics.service');
const metricsStack = require('../metrics.stack');

// Mocks
jest.mock('../metrics.stack', () => ({
  values: jest.fn(),
  push: jest.fn(),
  flush: jest.fn(),
}));

describe('MetricsService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should get metrics', () => {
    const metric = { value: 1, created: new Date() };
    const metric2 = { value: 2, created: new Date() };

    jest.spyOn(metricsService, 'isLessThanAnHour')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    jest.spyOn(metricsService, 'flushOldData').mockImplementation();
    jest.spyOn(metricsStack, 'values').mockReturnValue([metric, metric2]);

    const [response] = metricsService.getMetrics('key');
    expect(response).toEqual(metric);
  });

  it('should create metric', () => {
    const createdAt = new Date();
    jest.spyOn(metricsService, 'flushOldData').mockImplementation();
    jest.spyOn(metricsStack, 'push').mockImplementation();
    jest.spyOn(global.Date, 'now').mockReturnValue(createdAt);

    metricsService.createMetric('key', 1.2);
    expect(metricsStack.push).toHaveBeenCalledWith('key', { value: 1, createdAt });
  });
});