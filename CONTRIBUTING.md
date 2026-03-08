# Contributing to webext-processes

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

### Fork the Repository

1. Click the **Fork** button on the repository page
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-processes.git
   cd webext-processes
   ```

### Install Dependencies

This project uses pnpm for package management:

```bash
pnpm install
```

### Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bugfix-name
```

## Development

### Running Tests

Run the test suite:

```bash
pnpm test
```

### Building

Build the TypeScript:

```bash
pnpm build
```

## Pull Request Checklist

Before submitting a pull request, please ensure:

- [ ] Tests pass (`pnpm test`)
- [ ] Code builds without errors (`pnpm build`)
- [ ] New or updated tests cover your changes
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive
- [ ] PR title follows conventional commits format

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. Open a Pull Request against the `main` branch of the original repository

3. Fill out the PR template with:
   - Clear description of changes
   - Related issue number (if applicable)
   - Screenshots for UI changes (if applicable)

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run linting before committing

## Questions?

If you have questions, feel free to open an issue for discussion before starting a PR.
