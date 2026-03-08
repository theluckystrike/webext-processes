# webext-processes

[![npm version](https://img.shields.io/npm/v/webext-processes.svg)](https://www.npmjs.com/package/webext-processes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

Typed helpers for Chrome extension process management — monitor, query, and control extension processes.

## What is this?

`webext-processes` provides a TypeScript-friendly wrapper around Chrome's experimental Processes API. It enables Chrome extension developers to programmatically:

- **Query process IDs** for tabs
- **Retrieve detailed process information** including CPU usage, memory stats, and network activity
- **Terminate misbehaving renderer processes** to recover from crashes or memory leaks

## Features

- ✅ **Full TypeScript support** — Complete type definitions for all Chrome Processes API types
- ✅ **Promise-based API** — Modern async/await syntax instead of callbacks
- ✅ **Error handling** — Proper rejection on `chrome.runtime.lastError`
- ✅ **Memory profiling** — Optional memory stats (JS heap, cache sizes, SQLite)
- ✅ **Lightweight** — Zero runtime dependencies
- ✅ **Vitest ready** — Includes test utilities for mocking the Chrome API

## Requirements

- **Chrome version**: Dev channel or Chromium-based browsers with Processes API support
- **Manifest V3** compatible
- **Permissions**: No additional permissions required (uses undocumented Chrome APIs)

> **Note**: The Chrome Processes API is experimental and may not be available in all Chrome versions. Always check for API availability before use.

## Installation

```bash
npm install webext-processes
```

or with pnpm:

```bash
pnpm add webext-processes
```

## Quick Start

### 1. Get the Process ID for a Tab

```typescript
import { Processes } from 'webext-processes';

// Get the renderer process ID for a specific tab
const processId = await Processes.getProcessIdForTab(123);
console.log('Process ID:', processId);
```

### 2. Query Process Information

```typescript
import { Processes } from 'webext-processes';

// Get basic process info
const info = await Processes.getProcessInfo(processId);
console.log('Process type:', info[processId].type);

// Get detailed memory statistics
const detailedInfo = await Processes.getProcessInfo(processId, true);
const process = detailedInfo[processId];

console.log('CPU usage:', process.cpu);
console.log('Network:', process.network);
console.log('JS heap:', process.jsMemoryUsed, '/', process.jsMemoryAllocated);
console.log('Private memory:', process.privateMemory);
```

### 3. Terminate a Problematic Process

```typescript
import { Processes } from 'webext-processes';

// Terminate a misbehaving renderer process
const didTerminate = await Processes.terminate(processId);

if (didTerminate) {
  console.log('Process terminated successfully');
} else {
  console.log('Failed to terminate process');
}
```

### 4. Real-World: Monitor Tab Health

```typescript
import { Processes } from 'webext-processes';

async function checkTabHealth(tabId: number): Promise<{
  healthy: boolean;
  memory: number | null;
  cpu: number | null;
}> {
  try {
    const processId = await Processes.getProcessIdForTab(tabId);
    const info = await Processes.getProcessInfo(processId, true);
    const proc = info[processId];

    return {
      healthy: proc.type === 'renderer',
      memory: proc.privateMemory ?? null,
      cpu: proc.cpu ?? null,
    };
  } catch (error) {
    // API not available or process not found
    return { healthy: false, memory: null, cpu: null };
  }
}
```

## API Reference

### `Processes.getProcessIdForTab(tabId: number): Promise<number>`

Returns the ID of the renderer process for the given tab.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tabId` | `number` | The ID of the tab to get the process for |

**Returns:** `Promise<number>` — The process ID

**Throws:** Error if the API is unavailable or the tab doesn't exist

---

### `Processes.getProcessInfo(processIds: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>`

Returns detailed information about the specified processes.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `processIds` | `number \| number[]` | — | Single process ID or array of IDs |
| `includeMemory` | `boolean` | `false` | Include detailed memory statistics |

**Returns:** `Promise<Record<number, Process>>` — Map of process IDs to process info

**Process interface:**

```typescript
interface Process {
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
```

---

### `Processes.terminate(processId: number): Promise<boolean>`

Terminates the specified renderer process.

| Parameter | Type | Description |
|-----------|------|-------------|
| `processId` | `number` | The ID of the process to terminate |

**Returns:** `Promise<boolean>` — `true` if the process was terminated, `false` otherwise

**Note:** Only renderer processes can be terminated. Attempting to terminate browser processes will fail.

---

## Part of @zovo/webext

`webext-processes` is part of the **@zovo/webext** toolkit — a collection of TypeScript packages for building Chrome extensions.

Check out the main toolkit:

- **[webext-toolkit](https://github.com/theluckystrike/webext-toolkit)** — Umbrella monorepo

### Related packages

- **[webext-tabs](https://github.com/theluckystrike/webext-tabs)** — Tab management helpers
- **[webext-badge](https://github.com/theluckystrike/webext-badge)** — Badge text and color management
- **[webext-idle](https://github.com/theluckystrike/webext-idle)** — Idle detection API wrapper
- **[webext-notifications](https://github.com/theluckystrike/webext-notifications)** — Rich notifications API
- **[webext-offscreen](https://github.com/theluckystrike/webext-offscreen)** — Offscreen document API

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © [Zovo](https://zovo.one)

---

<a href="https://zovo.one">
  <img src="https://zovo.one/logo.svg" width="100" alt="Zovo" />
</a>
