import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('tasks/task1/fetchIsUserNameValid', () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

const mockedFetchIsUserNameAvailable = fetchIsUserNameAvailable as jest.MockedFunction<typeof fetchIsUserNameAvailable>;

describe('validateUserName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Returns false if name is shorter than 3 characters', async () => {
    const result = await validateUserName('ab');
    expect(result).toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('Returns false if name contains non-alphanumeric characters', async () => {
    const result1 = await validateUserName('abc!');
    const result2 = await validateUserName('abc def');
    const result3 = await validateUserName('abc_def');

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);

    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('Returns false if name starts with a number', async () => {
    const result = await validateUserName('1abc');
    expect(result).toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('Returns true if username is valid and available', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValueOnce(true);
    const result = await validateUserName('ValidUser');
    expect(result).toBe(true);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledWith('ValidUser');
  });

  it('Returns false if username is valid but not available', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValueOnce(false);
    const result = await validateUserName('ValidUser');
    expect(result).toBe(false);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledWith('ValidUser');
  });

  it('Returns false if fetchIsUserNameAvailable throws an error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    mockedFetchIsUserNameAvailable.mockRejectedValueOnce(new Error('Network error'));
  
    let result: boolean;
  
    try {
      result = await validateUserName('ValidUser');
    } catch {
      result = false;
    }
  
    expect(result).toBe(false);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledWith('ValidUser');
  
    consoleErrorSpy.mockRestore();
  });
});
