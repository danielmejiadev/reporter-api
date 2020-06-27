// Under test
const stack = require('../metrics.stack');

describe('MetricsStack', () => {
  it('should validate stack operations', () => {
    stack.push('key', 1);
    stack.push('key', 2);
    expect(stack.values('key')).toEqual([2, 1]);

    stack.flush('key');
    expect(stack.values('key')).toEqual([]);
  });
});