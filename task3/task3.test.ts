import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('getUtcStringDate', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('returns the UTC ISO string for a given Date input', () => {
    const input = new Date('2022-12-01T10:30:00+02:00'); 
    const result = getUtcStringDate(input);
    expect(result).toBe('2022-12-01T08:30:00.000Z'); 
  });

  it('returns the correct UTC string when no date is passed (system time mocked)', () => {
    mockDate.set({ isoDate: '2023-06-15T12:00:00Z' });
    const result = getUtcStringDate();
    expect(result).toBe('2023-06-15T12:00:00.000Z');
  });

  it('handles time zone offset correctly when passed a date from a different time zone', () => {
    const input = new Date('2024-01-01T13:00:00+01:00');
    const result = getUtcStringDate(input);
    expect(result).toBe('2024-01-01T12:00:00.000Z'); 
  });

  it('handles negative timezone offsets (e.g., UTC-5)', () => {
    const input = new Date('2024-01-01T04:00:00-05:00');
    const result = getUtcStringDate(input);
    expect(result).toBe('2024-01-01T09:00:00.000Z'); 
  });
});
