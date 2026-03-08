# webext-processes

[![npm version](https://img.shields.io/npm/v/webext-processes.svg)](https://www.npmjs.com/package/webext-processes)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/min/webext-processes)](https://bundlephobia.com/package/webext-processes)

Typed process management helpers for Chrome extensions — monitor memory, CPU, and manage extension processes. Part of [@zovo/webext](https://github.com/theluckystrike).

## Overview

`webext-processes` provides a TypeScript-friendly wrapper around the Chrome Processes API, enabling you to:

- Get the renderer process ID for any tab
- Retrieve detailed process information (CPU, memory, network usage)
- Terminate hanging or problematic processes
- Monitor extension performance in real-time

## Requirements

- **Chrome Extension Manifest V3**
- **`processes`** permission in your `manifest.json`

```json
{
  "permissions": ["processes"]
}
```

> **Note:** The Chrome Processes API is only available on Chrome's Dev channel and requires special access. For more details, see the [Chrome Processes API documentation](https://developer.chrome.com/docs/extensions/reference/processes/).

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

// Get the process ID for a specific tab
const processId = await Processes.getProcessIdForTab(1);
console.log('Process ID:', processId);
```

### Get Process Information

```typescript
import { Processes, Process } from 'webext-processes';

// Get detailed info for a process (including memory)
const processId = await Processes.getProcessIdForTab(1);
const info = await Processes.getProcessInfo(processId, true);

const processInfo: Process = info[processId];
console.log('CPU usage:', processInfo.cpu);
console.log('Network:', processInfo.network);
console.log('Private memory:', processInfo.privateMemory);
console.log('JS memory allocated:', processInfo.jsMemoryAllocated);
console.log('Process type:', processInfo.type);
```

### Get Multiple Processes

```typescript
import { Processes } from 'webext-processes';

// Get info for multiple processes at once
const tabIds = [1, 2, 3];
const processIds = await Promise.all(
  tabIds.map(tabId => Processes.getProcessIdForTab(tabId))
);

const allInfo = await Processes.getProcessInfo(processIds, true);
console.log('All process info:', allInfo);
```

### Terminate a Process

```typescript
import { Processes } from 'webext-processes';

// Terminate a hanging process
const processId = await Processes.getProcessIdForTab(1);
const terminated = await Processes.terminate(processId);

if (terminated) {
  console.log('Process terminated successfully');
} else {
  console.log('Failed to terminate process');
}
```

## API

### `Processes.getProcessIdForTab(tabId: number): Promise<number>`

Returns the ID of the renderer process for the given tab.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tabId` | `number` | The ID of the tab |

**Returns:** `Promise<number>` - The process ID

---

### `Processes.getProcessInfo(processIds: number | number[], includeMemory?: boolean): Promise<Record<number, Process>>`

Returns information about the given processes.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `processIds` | `number \| number[]` | — | Single process ID or array of IDs |
| `includeMemory` | `boolean` | `false` | Include detailed memory information |

**Returns:** `Promise<Record<number, Process>>` - Object mapping process IDs to process info

#### Process Interface

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

Terminates the given renderer process.

| Parameter | Type | Description |
|-----------|------|-------------|
| `processId` | `number` | The ID of the process to terminate |

**Returns:** `Promise<boolean>` - Whether the process was terminated

---

## Part of @zovo/webext

This package is part of the `@zovo/webext` collection of Chrome extension utilities:

- [webext-badge](https://github.com/theluckystrike/webext-badge) — Badge management
- [webext-clipboard](https://github.com/theluckystrike/webext-clipboard) — Clipboard operations
- [webext-cookies](https://github.com/theluckystrike/webext-cookies) — Cookies API wrapper
- [webext-event-bus](https://github.com/theluckystrike/webext-event-bus) — Event bus for extensions
- [webext-tabs](https://github.com/theluckystrike/webext-tabs) — Tab management
- [webext-notifications](https://github.com/theluckystrike/webext-notifications) — Notifications API
- [webext-devtools](https://github.com/theluckystrike/webext-devtools) — DevTools API helpers

## License

MIT © [theluckystrike](https://github.com/theluckystrike)

---

[Zovo](https://zovo.one) — Building the future of Chrome extensions
