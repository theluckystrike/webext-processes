# webext-processes

A TypeScript-friendly wrapper for the Chrome Processes API.

## Installation

```bash
npm install webext-processes
```

## Usage

```typescript
import { Processes } from 'webext-processes';

// Get process ID for a tab
const processId = await Processes.getProcessIdForTab(1);

// Get process info
const info = await Processes.getProcessInfo(processId, true);
console.log('CPU usage:', info[processId].cpu);

// Terminate a process
await Processes.terminate(processId);
```

## API

### `Processes.getProcessIdForTab(tabId)`
Returns the ID of the renderer process for the given tab.

### `Processes.getProcessInfo(processIds, includeMemory?)`
Returns information about the given processes. `processIds` can be a single ID or an array of IDs.

### `Processes.terminate(processId)`
Terminates the given renderer process.

---

[zovo.one](https://zovo.one)
