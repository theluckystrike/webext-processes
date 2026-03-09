# webext-processes

<div align="center">

[![npm version](https://img.shields.io/npm/v/webext-processes.svg)](https://www.npmjs.com/package/webext-processes)
[![npm license](https://img.shields.io/npm/l/webext-processes.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/theluckystrike/webext-processes/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-processes/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/min/webext-processes)](https://bundlephobia.com/package/webext-processes)

</div>

A TypeScript-friendly wrapper for the Chrome Processes API — monitor memory, CPU, and manage extension processes with full type safety.

## Features

- 🎯 **Full TypeScript Support** — Complete type definitions for all Chrome Process APIs
- 🛡️ **Runtime Safety** — Graceful error handling with descriptive error messages
- 📊 **Memory Monitoring** — Track private memory, JS heap, cache sizes
- ⚡ **CPU Usage** — Access CPU utilization data for each process
- 🔄 **Process Management** — Terminate individual renderer processes safely
- 🔗 **Part of @zovo/webext** — Seamless integration with the Zovo WebExtension ecosystem

## Requirements

- **Chrome** (Dev channel or with flag enabled)
- **Manifest V3**
- `processes` permission in your `manifest.json`

```json
{
  "permissions": ["processes"]
}
```

## Installation

```bash
npm install webext-processes
```

```bash
pnpm add webext-processes
```

```bash
yarn add webext-processes
```

## Usage

### Get Process ID for a Tab

```typescript
import { Processes } from 'webext-processes';

// Get the renderer process ID for a specific tab
const processId = await Processes.getProcessIdForTab(1);
console.log('Process ID:', processId);
```

### Get Process Information

```typescript
import { Processes } from 'webext-processes';

// Get info for a single process
const info = await Processes.getProcessInfo(12345, true);
console.log('CPU Usage:', info[12345].cpu);
console.log('Private Memory:', info[12345].privateMemory);
console.log('JS Heap Used:', info[12345].jsMemoryUsed);

// Get info for multiple processes at once
const multiInfo = await Processes.getProcessInfo([123, 456, 789], true);
for (const [pid, proc] of Object.entries(multiInfo)) {
  console.log(`Process ${pid}:`, proc.type, proc.cpu);
}
```

### Terminate a Process

```typescript
import { Processes } from 'webext-processes';

// Get process ID for a tab
const processId = await Processes.getProcessIdForTab(1);

// Attempt to terminate the process
const didTerminate = await Processes.terminate(processId);
if (didTerminate) {
  console.log('Process terminated successfully');
} else {
  console.log('Failed to terminate process');
}
```

### Process Types

The `Process` interface provides detailed information about each process:

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

## API Reference

| Method | Description |
|--------|-------------|
| `Processes.getProcessIdForTab(tabId)` | Returns the renderer process ID for a given tab |
| `Processes.getProcessInfo(processIds, includeMemory?)` | Returns detailed info for one or more processes. Set `includeMemory` to `true` for memory metrics |
| `Processes.terminate(processId)` | Terminates a renderer process. Returns `true` if successful |

## Error Handling

All methods throw descriptive errors if the Chrome Processes API is unavailable or if the operation fails:

```typescript
try {
  const info = await Processes.getProcessInfo(12345);
} catch (error) {
  if (error.message.includes('not available')) {
    console.log('Chrome Processes API requires Dev channel or special flags');
  }
}
```

## Part of @zovo/webext

`webext-processes` is part of the @zovo/webext ecosystem — a collection of TypeScript packages for building modern Chrome extensions.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with 🔥 by [theluckystrike](https://github.com/theluckystrike)

[zovo.one](https://zovo.one)

</div>
