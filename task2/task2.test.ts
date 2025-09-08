import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
  it('Throws if threshold is negative', () => {
    expect(() => new QuantityValidator(-1, 5)).toThrow();
  });

  it('Does not throw if threshold is zero', () => {
    expect(() => new QuantityValidator(0, 5)).not.toThrow();
  });

  it('Invalidates quantity 0 when threshold is zero', () => {
    const validator = new QuantityValidator(0, 5);
    const result = validator.validate(0);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity must be greater than zero');
  });

  it('Invalidates negative quantity when threshold is zero', () => {
    const validator = new QuantityValidator(0, 5);
    const result = validator.validate(-1);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity must be greater than zero');
  });

  it('Validates quantity > 0 and divisible by packageSize when threshold is zero', () => {
    const validator = new QuantityValidator(0, 5);
    const result = validator.validate(5);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('Invalidates quantity > 0 and not divisible by packageSize when threshold is zero', () => {
    const validator = new QuantityValidator(0, 5);
    const result = validator.validate(3);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity should be divisible by 5');
  });


  it('Allows quantities below a very large threshold without divisibility check', () => {
    const validator = new QuantityValidator(1_000_000, 5);
    const result = validator.validate(999_999);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
  
  it('Allows quantities equal to the very large threshold if divisible by packageSize', () => {
    const validator = new QuantityValidator(1_000_000, 5);
    const result = validator.validate(1_000_000); 
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
  
  it('Allows quantities above the very large threshold if divisible by packageSize', () => {
    const validator = new QuantityValidator(1_000_000, 5);
    const result = validator.validate(1_000_005); 
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
  
  it('Rejects quantities above the very large threshold if not divisible by packageSize', () => {
    const validator = new QuantityValidator(1_000_000, 5);
    const result = validator.validate(1_000_001);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Quantity should be divisible by 5');
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
