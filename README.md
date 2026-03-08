# webext-processes

[![npm version](https://img.shields.io/npm/v/webext-processes.svg)](https://www.npmjs.com/package/webext-processes)
[![npm downloads](https://img.shields.io/npm/dm/webext-processes)](https://www.npmjs.com/package/webext-processes)
[![License](https://img.shields.io/npm/l/webext-processes)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/min/webext-processes)](https://bundlephobia.com/package/webext-processes)

A TypeScript-friendly wrapper for the Chrome Processes API — monitor memory, CPU, and manage extension processes with full type safety.

## Overview

`webext-processes` provides typed wrappers around Chrome's `chrome.processes` API, enabling extension developers to:

- Get process IDs for tabs
- Retrieve detailed process information (CPU, memory, network)
- Terminate hanging or problematic renderer processes

Part of the [@zovo/webext](https://github.com/zovo/webext) ecosystem.

## Requirements

- **Chrome**: Version with Processes API support (Dev channel or enterprise policies)
- **Manifest**: V3
- **Permissions**: `processes` in your `manifest.json`:

```json
{
  "permissions": ["processes"]
}
```

## Installation

```bash
npm install webext-processes
# or
pnpm add webext-processes
# or
yarn add webext-processes
```

## Usage

### Get Process ID for a Tab

```typescript
import { Processes } from 'webext-processes';

const tabId = 1;
const processId = await Processes.getProcessIdForTab(tabId);
console.log('Process ID:', processId);
```

### Get Detailed Process Info

```typescript
import { Processes } from 'webext-processes';

// Get CPU and memory info for a process
const processId = 123;
const info = await Processes.getProcessInfo(processId, true);

console.log('CPU Usage:', info[processId].cpu);
console.log('Private Memory:', info[processId].privateMemory);
console.log('JS Memory Used:', info[processId].jsMemoryUsed);
console.log('Process Type:', info[processId].type);
```

### Terminate a Process

```typescript
import { Processes } from 'webext-processes';

const processId = 123;
const terminated = await Processes.terminate(processId);

if (terminated) {
  console.log('Process terminated successfully');
}
```

### Monitor Multiple Processes

```typescript
import { Processes } from 'webext-processes';

const processIds = [123, 456, 789];
const allInfo = await Processes.getProcessInfo(processIds, true);

for (const [pid, info] of Object.entries(allInfo)) {
  console.log(`Process ${pid} (${info.type}):`, {
    cpu: info.cpu,
    memory: info.privateMemory,
  });
}
```

## API Reference

| Method | Description | Returns |
|--------|-------------|---------|
| `Processes.getProcessIdForTab(tabId)` | Returns the renderer process ID for a given tab | `Promise<number>` |
| `Processes.getProcessInfo(processIds, includeMemory?)` | Gets detailed info about processes. Set `includeMemory` to `true` for memory metrics | `Promise<Record<number, Process>>` |
| `Processes.terminate(processId)` | Terminates a renderer process. Returns `true` if successful | `Promise<boolean>` |

### Process Interface

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

## Error Handling

All methods throw an error if the Chrome Processes API is unavailable or if `chrome.runtime.lastError` is set:

```typescript
import { Processes } from 'webext-processes';

try {
  const processId = await Processes.getProcessIdForTab(1);
} catch (error) {
  if (error.message.includes('not available')) {
    console.warn('Processes API not available in this Chrome version');
  } else {
    throw error;
  }
}
```

## License

MIT License — see [LICENSE](./LICENSE) for details.

## Part of @zovo/webext

`webext-processes` is part of the @zovo/webext ecosystem — a collection of TypeScript-first utilities for Chrome extension development.

- [webext-events](https://github.com/zovo/webext-events) — Typed event handlers
- [webext-storage](https://github.com/zovo/webext-storage) - Storage API wrappers
- [webext-tabs](https://github.com/zovo/webext-tabs) — Tab management utilities

Visit [zovo.one](https://zovo.one) for more information.
