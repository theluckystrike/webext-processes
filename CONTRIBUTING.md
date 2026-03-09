# Contributing to webext-processes

Thank you for your interest in contributing to `webext-processes`! This document outlines the process for contributing to this project.

## Development Setup

1. **Fork the repository** — Click the "Fork" button on the repository page

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-processes.git
   cd webext-processes
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes** — Implement your feature or bug fix

2. **Run tests:**

   ```bash
   pnpm test
   ```

3. **Build the project:**

   ```bash
   pnpm build
   ```

4. **Check types:**

   ```bash
   pnpm typecheck
   ```

## Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Tests pass (`pnpm test`)
- [ ] Code builds without errors (`pnpm build`)
- [ ] TypeScript types are correct (`pnpm typecheck`)
- [ ] New APIs are properly documented in JSDoc
- [ ] README.md is updated if adding new methods
- [ ] Commit messages follow conventional commits format

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new method
fix: resolve issue with process termination
docs: update API documentation
test: add tests for new functionality
```

## Code Style

- Use TypeScript with strict mode
- Follow existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

## Reporting Issues

When reporting issues, please include:

- Chrome version
- Manifest version (V2/V3)
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
