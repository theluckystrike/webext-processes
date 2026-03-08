<div align="center">

# webext-processes

Typed process management helpers for Chrome extensions. Query Chrome processes, get memory stats, and manage renderer processes.

[![npm version](https://img.shields.io/npm/v/webext-processes)](https://www.npmjs.com/package/webext-processes)
[![npm downloads](https://img.shields.io/npm/dm/webext-processes)](https://www.npmjs.com/package/webext-processes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/webext-processes)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Process info** -- get CPU, memory, and network stats for Chrome processes
- **Tab-to-process mapping** -- find which process renders a specific tab
- **Terminate processes** -- kill misbehaving renderer processes
- **Typed** -- full TypeScript interfaces for process data
- **Promise-based** -- async/await for all operations
- **Memory details** -- JS heap, image cache, script cache, CSS cache, SQLite memory

## Installation

```bash
npm install webext-processes
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add webext-processes
# or
yarn add webext-processes
```

</details>

## Quick Start

```typescript
import { Processes } from "webext-processes";

const processId = await Processes.getProcessIdForTab(tabId);
const info = await Processes.getProcessInfo(processId, true);  // include memory
await Processes.terminate(processId);
```

## API

| Method | Description |
|--------|-------------|
| `getProcessIdForTab(tabId)` | Get renderer process ID for a tab |
| `getProcessInfo(ids, includeMemory?)` | Get detailed process info |
| `terminate(processId)` | Terminate a renderer process |

## Permissions

Requires the `processes` permission (available on Chrome Dev/Canary channels):

```json
{ "permissions": ["processes"] }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
