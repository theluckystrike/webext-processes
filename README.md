# webext-processes

A TypeScript-friendly, Promise-based wrapper for the Chrome Processes API. Provides type-safe access to browser process information, memory metrics, and process termination capabilities for Chrome extensions.

## Why webext-processes?

The Chrome Processes API is a powerful but underutilized API that lets you:

- **Monitor performance**: Get CPU, memory, and network usage per process
- **Debug extensions**: Identify which processes are consuming resources  
- **Manage processes**: Terminate runaway or unresponsive renderer processes
- **Track tab activity**: Map tabs to their underlying renderer processes

This library wraps the callback-based Chrome API with modern Promises and full TypeScript support.

## Installation

```bash
npm install webext-processes
```

Or with pnpm:

```bash
pnpm add webext-processes
```

Or with yarn:

```bash
yarn add webext-processes
```

## Requirements

- Chrome browser (Dev channel recommended - see below)
- Chrome extension with `processes` permission

### Chrome Processes API Availability

The Chrome Processes API (`chrome.processes`) is **not available in stable Chrome**. It requires:

- **Chrome Dev channel** or **Canary**
- **特定 extensions** with special permissions (typically enterprise or debugging extensions)

For most extension use cases, you'll want to check if the API is available:

```typescript
import { Processes } from 'webext-processes';

if (chrome.processes) {
  const processId = await Processes.getProcessIdForTab(tabId);
}
```

## Usage

### Get Process ID for a Tab

```typescript
import { Processes } from 'webext-processes';

// Get the renderer process ID for a tab
const processId = await Processes.getProcessIdForTab(tabId);
console.log(`Tab ${tabId} runs in process ${processId}`);
```

### Get Process Information

```typescript
import { Processes } from 'webext-processes';

// Get basic process info
const info = await Processes.getProcessIdForTab(123);
const processInfo = await Processes.getProcessInfo(processId);

// Get detailed memory information
const detailedInfo = await Processes.getProcessInfo(processId, true);

console.log('Process type:', detailedInfo[processId].type);
console.log('CPU usage:', detailedInfo[processId].cpu);
console.log('Memory allocated:', detailedInfo[processId].jsMemoryAllocated);
```

### Terminate a Process

```typescript
import { Processes } from 'webext-processes';

// Terminate an unresponsive renderer process
const terminated = await Processes.terminate(processId);

if (terminated) {
  console.log('Process terminated successfully');
} else {
  console.log('Failed to terminate process');
}
```

### Complete Example: Monitor Tab Processes

```typescript
import { Processes } from 'webext-processes';

async function analyzeTab(tabId: number) {
  try {
    // Get the process ID for this tab
    const processId = await Processes.getProcessIdForTab(tabId);
    
    // Get detailed info with memory metrics
    const info = await Processes.getProcessInfo(processId, true);
    const process = info[processId];
    
    console.log({
      type: process.type,
      cpu: process.cpu,
      memory: {
        js: process.jsMemoryAllocated,
        network: process.network,
        private: process.privateMemory,
      }
    });
    
  } catch (error) {
    if (error.message.includes('not available')) {
      console.log('Processes API not available in this Chrome version');
    } else {
      throw error;
    }
  }
}
```

## API Reference

### `Processes.getProcessIdForTab(tabId: number): Promise<number>`

Returns the ID of the renderer process associated with the given tab.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tabId` | `number` | The ID of the tab |

**Returns:** `Promise<number>` - The process ID

---

### `Processes.getProcessInfo(processIds: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>`

Retrieves information about one or more processes.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `processIds` | `number` or `number[]` | - | Single process ID or array of IDs |
| `includeMemory` | `boolean` | `false` | Whether to include detailed memory metrics |

**Returns:** `Promise<Record<number, Process>>` - Object mapping process IDs to process info

---

### `Processes.terminate(processId: number): Promise<boolean>`

Terminates the specified renderer process.

| Parameter | Type | Description |
|-----------|------|-------------|
| `processId` | `number` | The ID of the process to terminate |

**Returns:** `Promise<boolean>` - `true` if terminated successfully

**Note:** This can only terminate renderer processes. Attempting to terminate browser or other critical processes will fail.

---

## Type Definitions

### Process

```typescript
interface Process {
  /** Unique process identifier */
  id: number;
  
  /** Operating system process ID */
  osProcessId: number;
  
  /** Process type */
  type: 'browser' | 'renderer' | 'extension' | 'notification' | 'plugin' | 'worker' | 'other';
  
  /** Profile name */
  profile: string;
  
  /** NaCl debug port (if applicable) */
  naclDebugPort: number;
  
  /** Tasks/title info */
  tasks: { title: string; tabId?: number }[];
  
  /** CPU usage (when includeMemory: true) */
  cpu?: number;
  
  /** Network usage in KB/s (when includeMemory: true) */
  network?: number;
  
  /** Private memory usage (when includeMemory: true) */
  privateMemory?: number;
  
  /** JavaScript heap allocated (when includeMemory: true) */
  jsMemoryAllocated?: number;
  
  /** JavaScript heap used (when includeMemory: true) */
  jsMemoryUsed?: number;
  
  /** SQLite memory used (when includeMemory: true) */
  sqliteMemory?: number;
  
  /** Image cache memory (when includeMemory: true) */
  imageCacheMemory?: number;
  
  /** Script cache memory (when includeMemory: true) */
  scriptCacheMemory?: number;
  
  /** CSS cache memory (when includeMemory: true) */
  cssCacheMemory?: number;
}
```

## Permissions

Add the `processes` permission to your `manifest.json`:

```json
{
  "permissions": [
    "processes"
  ]
}
```

**Note:** The `processes` permission is restricted and typically requires approval from Google for public extensions. It's primarily intended for:

- Enterprise extensions
- Developer/debugging tools
- Internal enterprise tooling

## Error Handling

The library throws descriptive errors for common issues:

```typescript
import { Processes } from 'webext-processes';

try {
  const processId = await Processes.getProcessIdForTab(tabId);
} catch (error) {
  if (error.message.includes('not available')) {
    // The Processes API is not available in this Chrome version
    console.warn('Processes API requires Chrome Dev/Canary channel');
  } else if (error.message.includes('No process with id')) {
    // The tab or process no longer exists
    console.warn('Tab or process not found');
  } else {
    throw error;
  }
}
```

## Building

```bash
npm install
npm run build
```

## Testing

```bash
npm test
```

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
