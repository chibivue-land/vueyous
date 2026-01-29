## Background

The project previously used a GitHub Actions workflow (`.github/workflows/changelog.yml`) for automated changelog generation and release management. However, this approach encountered a critical permission issue:

**The Problem:**

- When the workflow attempted to create pull requests using `gh pr create`, it failed with the error: `"GitHub Actions is not permitted to create or approve pull requests (createPullRequest)"`
- This is a GitHub security restriction to prevent infinite workflow loops (workflow creates PR → PR triggers workflow → creates another PR, etc.)
- At the repository level, the setting "Allow GitHub Actions to create and approve pull requests" was disabled and couldn't be enabled due to Organization-level restrictions

**Solutions Considered:**

1. **Organization Settings** - Requires admin permissions to change organization-wide policy
2. **Personal Access Token (PAT)** - Adds token management overhead and security concerns
3. **GitHub App** - More secure than PAT but requires additional setup and maintenance
4. **Local Execution** - Simplest approach, avoids permission issues entirely

**The Decision:**
We chose to remove the GitHub Actions workflow and implement release management through npm scripts. This approach:

- Eliminates GitHub Actions permission issues
- Provides more control over the release process
- Allows developers to verify changes locally before creating releases
- Simplifies the workflow by removing CI/CD complexity for releases

## Changes

- **Removed**: `.github/workflows/changelog.yml` - GitHub Actions workflow for automated releases
- **Added**: Three npm scripts in `package.json`:
  - `release:patch` - Create a patch release (bug fixes)
  - `release:minor` - Create a minor release (new features)
  - `release:major` - Create a major release (breaking changes)

These scripts use `changelogen` to automatically:

- Generate/update CHANGELOG.md based on conventional commits
- Bump version in package.json
- Create a git commit and tag

## Usage

```bash
# Patch release (0.0.1 → 0.0.2)
pnpm run release:patch

# Minor release (0.0.1 → 0.1.0)
pnpm run release:minor

# Major release (0.0.1 → 1.0.0)
pnpm run release:major
```

After running the release script:

1. Review the generated changelog and version bump
2. Push the commit and tag: `git push --follow-tags`
3. Create a pull request manually if needed
