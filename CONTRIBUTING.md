# Contributing to webext-processes

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/webext-processes.git
cd webext-processes
```

3. **Install dependencies**:

```bash
npm install
```

4. **Create a feature branch**:

```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

1. Make your changes in the `src/` directory
2. Run tests to ensure everything works:

```bash
npm test
```

3. Build the project:

```bash
npm run build
```

4. Commit your changes with a descriptive message:

```bash
git commit -m "Add feature: description of your changes"
```

5. Push to your fork:

```bash
git push origin feature/your-feature-name
```

6. **Open a Pull Request** against the `main` branch of the original repository

## Pull Request Checklist

Before submitting your PR, please ensure:

- [ ] Tests pass (`npm test` passes)
- [ ] Code builds without errors (`npm run build` succeeds)
- [ ] New code is properly typed (TypeScript)
- [ ] Documentation is updated if needed (README, comments)
- [ ] Commit messages are clear and descriptive

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Keep functions focused and small

## Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists
2. If not, create a new issue with:
   - Clear description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
