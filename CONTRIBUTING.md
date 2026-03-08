# Contributing to webext-processes

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-processes.git
   cd webext-processes
   ```

3. **Install dependencies** (we use pnpm):

   ```bash
   pnpm install
   ```

4. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

We use [Vitest](https://vitest.dev/) for testing. Run tests with:

```bash
pnpm test
```

For watch mode during development:

```bash
pnpm test --watch
```

### Building

Build the TypeScript project:

```bash
pnpm build
```

### Code Style

- Use **TypeScript** for all new code
- Follow the existing code style (ESLint-compatible)
- Add type definitions for all new functions and interfaces
- Write tests for new functionality

## Submitting Changes

1. **Commit your changes** with a descriptive message:

   ```bash
   git commit -am 'Add new feature: feature description'
   ```

2. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** against the `main` branch of the original repository

4. **Fill out the PR template** with:
   - Description of changes
   - Related issues (if any)
   - Testing performed

## Reporting Issues

When reporting issues, please include:

- Chrome version and OS
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
