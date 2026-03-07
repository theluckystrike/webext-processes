import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Processes } from './index';

describe('Processes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    global.chrome = {
      processes: {
        getProcessIdForTab: vi.fn(),
        getProcessInfo: vi.fn(),
        terminate: vi.fn(),
      },
      runtime: {
        lastError: null,
      },
    };
  });

  it('should get process ID for tab', async () => {
    vi.mocked((chrome as any).processes.getProcessIdForTab).mockImplementation((tabId, callback) => {
      callback(123);
    });

    const processId = await Processes.getProcessIdForTab(1);
    expect(processId).toBe(123);
    expect((chrome as any).processes.getProcessIdForTab).toHaveBeenCalledWith(1, expect.any(Function));
  });

  it('should get process info', async () => {
    const mockInfo = { 123: { id: 123, type: 'renderer' } };
    vi.mocked((chrome as any).processes.getProcessInfo).mockImplementation((ids, includeMemory, callback) => {
      callback(mockInfo);
    });

    const info = await Processes.getProcessInfo(123, true);
    expect(info).toEqual(mockInfo);
    expect((chrome as any).processes.getProcessInfo).toHaveBeenCalledWith(123, true, expect.any(Function));
  });

  it('should terminate process', async () => {
    vi.mocked((chrome as any).processes.terminate).mockImplementation((processId, callback) => {
      callback(true);
    });

    const terminated = await Processes.terminate(123);
    expect(terminated).toBe(true);
    expect((chrome as any).processes.terminate).toHaveBeenCalledWith(123, expect.any(Function));
  });

  it('should reject on chrome.runtime.lastError', async () => {
    vi.mocked((chrome as any).processes.getProcessIdForTab).mockImplementation((tabId, callback) => {
      // @ts-ignore
      chrome.runtime.lastError = { message: 'Failed' };
      callback(null);
    });

    await expect(Processes.getProcessIdForTab(1)).rejects.toThrow('Failed');
  });

  it('should throw error if API is not available', async () => {
    // @ts-ignore
    delete global.chrome.processes;
    await expect(Processes.terminate(123)).rejects.toThrow('Chrome Processes API is not available.');
  });
});
