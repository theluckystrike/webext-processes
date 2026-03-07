export interface Process {
  id: number;
  osProcessId: number;
  type: 'browser' | 'renderer' | 'extension' | 'notification' | 'plugin' | 'worker' | 'other';
  profile: string;
  naclDebugPort: number;
  tasks: { title: string; tabId?: number }[];
  cpu?: number;
  network?: number;
  privateMemory?: number;
  jsMemoryAllocated?: number;
  jsMemoryUsed?: number;
  sqliteMemory?: number;
  imageCacheMemory?: number;
  scriptCacheMemory?: number;
  cssCacheMemory?: number;
}

/**
 * A wrapper for the Chrome Processes API.
 */
export class Processes {
  private static get api(): any {
    if (typeof chrome === 'undefined' || !(chrome as any).processes) {
      throw new Error('Chrome Processes API is not available. This API is typically only available on the Dev channel or for certain extensions.');
    }
    return (chrome as any).processes;
  }

  /**
   * Returns the ID of the renderer process for the given tab.
   */
  static async getProcessIdForTab(tabId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.api.getProcessIdForTab(tabId, (processId: number) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(processId);
        }
      });
    });
  }

  /**
   * Returns information about the given processes.
   */
  static async getProcessInfo(processIds: number | number[], includeMemory: boolean = false): Promise<Record<number, Process>> {
    return new Promise((resolve, reject) => {
      this.api.getProcessInfo(processIds, includeMemory, (processes: Record<number, Process>) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(processes);
        }
      });
    });
  }

  /**
   * Terminates the given renderer process.
   */
  static async terminate(processId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.terminate(processId, (didTerminate: boolean) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(didTerminate);
        }
      });
    });
  }

  /**
   * Gets all processes.
   */
  static async getAllProcesses(includeMemory: boolean = false): Promise<Process[]> {
    // There's no direct getAll, but we can query by some process info if we knew IDs.
    // However, some implementations of this API might have quirks.
    // For now, let's provide a way to get info if IDs are known.
    throw new Error('getAllProcesses is not directly supported by the Chrome API without process IDs.');
  }
}
