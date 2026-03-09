# webext-processes

[![GitHub stars](https://img.shields.io/github/stars/theluckystrike/webext-processes)](https://github.com/theluckystrike/webext-processes/stargazers)
[![License](https://img.shields.io/github/license/theluckystrike/webext-processes)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/theluckystrike/webext-processes)](https://github.com/theluckystrike/webext-processes/commit/main)

A TypeScript-friendly wrapper for the Chrome Processes API. This library provides a clean, promise-based interface to access Chrome's internal process information, enabling extension developers to monitor and manage browser processes.

> **Note:** The Chrome Processes API is only available on the Chrome Dev channel or for certain extensions with appropriate permissions.

## Features

- 🚀 Promise-based API for modern async/await patterns
- 📦 Lightweight TypeScript wrapper with full type definitions
- 🔍 Get process information for tabs (CPU, memory usage, etc.)
- 🛑 Terminate hanging or problematic renderer processes
- ✅ Built-in error handling with proper TypeScript types

## Installation

```bash
npm install webext-processes
```

or with yarn:

```bash
yarn add webext-processes
```

or with pnpm:

```bash
pnpm add webext-processes
```

## Requirements

- Chrome Dev channel or a Chrome extension with the `processes` permission
- TypeScript 5.0+ (if using TypeScript)
- The `processes` permission in your `manifest.json`:

```json
{
  "permissions": [
    "processes"
  ]
}
```

## Usage

```typescript
import { Processes } from 'webext-processes';

// Get the process ID for a specific tab
const tabId = 1;
const processId = await Processes.getProcessIdForTab(tabId);
console.log('Process ID:', processId);

// Get detailed process information (including memory stats)
const processInfo = await Processes.getProcessInfo(processId, true);
const info = processInfo[processId];

console.log('Process type:', info.type);
console.log('CPU usage:', info.cpu, '%');
console.log('Memory allocated:', info.jsMemoryAllocated, 'bytes');
console.log('Tasks:', info.tasks);

// Terminate a problematic process
const terminated = await Processes.terminate(processId);
console.log('Process terminated:', terminated);
```

## API Reference

### `Processes.getProcessIdForTab(tabId: number): Promise<number>`

Returns the ID of the renderer process for the given tab.

**Parameters:**
- `tabId` (number): The ID of the tab to get the process ID for.

**Returns:** Promise resolving to the process ID.

**Example:**
```typescript
const processId = await Processes.getProcessIdForTab(1);
```

---

### `Processes.getProcessInfo(processIds: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>`

Returns information about the given processes.

**Parameters:**
- `processIds` (number | number[]): A single process ID or array of process IDs.
- `includeMemory` (boolean, optional): Whether to include detailed memory information. Default: `false`.

**Returns:** Promise resolving to a record of process IDs to Process objects.

**Process Object Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `id` | number | The process ID |
| `osProcessId` | number | The OS process ID |
| `type` | string | Process type: 'browser', 'renderer', 'extension', 'notification', 'plugin', 'worker', or 'other' |
| `profile` | string | The profile associated with the process |
| `naclDebugPort` | number | NaCl debug port (if applicable) |
| `tasks` | Array | Array of tasks/title and optional tabId |
| `cpu` | number? | CPU usage percentage (when includeMemory is true) |
| `network` | number? | Network usage (when includeMemory is true) |
| `privateMemory` | number? | Private memory usage (when includeMemory is true) |
| `jsMemoryAllocated` | number? | JavaScript heap allocated (when includeMemory is true) |
| `jsMemoryUsed` | number? | JavaScript heap used (when includeMemory is true) |
| `sqliteMemory` | number? | SQLite memory usage (when includeMemory is true) |
| `imageCacheMemory` | number? | Image cache memory (when includeMemory is true) |
| `scriptCacheMemory` | number? | Script cache memory (when includeMemory is true) |
| `cssCacheMemory` | number? | CSS cache memory (when includeMemory is true) |

**Example:**
```typescript
// Get basic info for multiple processes
const info = await Processes.getProcessInfo([123, 456, 789]);

// Get detailed memory information for a single process
const detailedInfo = await Processes.getProcessInfo(123, true);
```

---

### `Processes.terminate(processId: number): Promise<boolean>`

Terminates the given renderer process.

**Parameters:**
- `processId` (number): The ID of the process to terminate.

**Returns:** Promise resolving to `true` if the process was terminated, `false` otherwise.

**Example:**
```typescript
const terminated = await Processes.terminate(processId);
if (terminated) {
  console.log('Process successfully terminated');
}
```

---

### Error Handling

The API throws errors when:
- The Chrome Processes API is not available
- Chrome runtime errors occur

```typescript
import { Processes } from 'webext-processes';

try {
  const processId = await Processes.getProcessIdForTab(1);
} catch (error) {
  if (error instanceof Error) {
    console.error('Failed to get process ID:', error.message);
  }
}
```

## Project Structure

```
webext-processes/
├── src/
│   ├── index.ts        # Main source code
│   └── index.test.ts   # Unit tests
├── LICENSE             # MIT License
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
