# Contributing to React OAuth2 Social Login

First off, thank you for considering contributing to React OAuth2 Social Login! It's people like you who make this library better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to [project email].

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include code samples and screenshots if relevant

### Suggesting Enhancements

If you have a suggestion for the library, we'd love to hear about it. Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A step-by-step description of the suggested enhancement
* Specific examples to demonstrate the steps
* A description of the current behavior and explanation of why you'd like to see it changed
* Explain why this enhancement would be useful to most users

### Pull Requests

#### Setting Up the Development Environment

1. Fork the repo and create your branch from `main`:
   ```bash
   git clone git@github.com:maxifjaved/react-oauth2.git
   cd react-oauth2
   git checkout -b your-feature-branch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```

#### Development Workflow

1. Make your changes:
    * Write your code
    * Add or update tests as needed
    * Update documentation as needed

2. Run the test suite:
   ```bash
   npm test
   ```

3. Run the linter:
   ```bash
   npm run lint
   ```

4. Build the package:
   ```bash
   npm run build
   ```

#### Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Your commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
* feat: A new feature
* fix: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code
* refactor: A code change that neither fixes a bug nor adds a feature
* perf: A code change that improves performance
* test: Adding missing tests or correcting existing tests
* chore: Changes to the build process or auxiliary tools

#### Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable
2. Update the CHANGELOG.md with notes on your changes
3. The PR will be merged once you have the sign-off of at least one maintainer

### Style Guide

* Use TypeScript for all new code
* Follow the existing code style
* Use meaningful variable and function names
* Add comments for complex logic
* Keep functions small and focused
* Use modern React patterns and hooks
* Write unit tests for new features

### Testing

* Write unit tests for all new features
* Ensure all tests pass before submitting a PR
* Include integration tests where appropriate
* Test across different browsers if making UI changes

## Project Structure

```
src/
├── utils/
│   ├── providers.ts
│   ├── helpers.ts
└─ index.ts
└─ FacebookOauth2.tsx
└─ GoogleOauth2.tsx
```


## Questions?

Feel free to open an issue if you have any questions, or join our Discord server for real-time discussions with the community.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.