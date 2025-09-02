import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
  it('Throws if threshold is negative', () => {
    expect(() => new QuantityValidator(-1, 5)).toThrow();
  });

  it('Throws if packageSize is zero', () => {
    expect(() => new QuantityValidator(10, 0)).toThrow();
  });

  it('Throws if packageSize is negative', () => {
    expect(() => new QuantityValidator(10, -3)).toThrow();
  });

  it('Returns valid for quantity less than threshold', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(7);

    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('Returns valid when quantity equals threshold and is divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(10);

    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('Returns valid for quantity above threshold and divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(20);

    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('Returns invalid when quantity above threshold is not divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(13);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity should be divisible by 5');
  });

  it('Returns invalid when quantity equals threshold but not divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 3);
    const result = validator.validate(10);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity should be divisible by 3');
  });

  it('Returns invalid when quantity is zero', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(0);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity must be greater than zero');
  });

  it('Returns invalid when quantity is negative', () => {
    const validator = new QuantityValidator(10, 5);
    const result = validator.validate(-5);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity must be greater than zero');
  });
});
