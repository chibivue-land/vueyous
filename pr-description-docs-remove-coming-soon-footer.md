# chore: improve CI workflow and clean up documentation

## Linked issue

<!-- Please ensure there is an open issue and mention its number. For example, "resolves #123" -->

## Summary

This PR makes two improvements to the project infrastructure and documentation:
1. Enhances the CI workflow by adding build validation steps
2. Removes outdated "Coming Soon" footer references from useCounter documentation across all languages

## Changes

- **CI/CD Enhancement** (`.github/workflows/check.yml`):
  - Added `pnpm run build` step to validate production builds in CI
  - Added `pnpm run docs:build` step to ensure documentation builds successfully

- **Documentation Cleanup** (`packages/{guide,ja,zh}/state/useCounter.md`):
  - Removed "Next: useToggle (Coming Soon)" footer from English documentation
  - Removed "次: useToggle （準備中）" footer from Japanese documentation
  - Removed "下一步：useToggle（准备中）" footer from Chinese documentation

## Testing

- [ ] CI passes with new build steps
- [ ] Documentation still renders correctly without footer
- [ ] All three language versions are consistently updated

## Screenshots (if applicable)

N/A - No UI changes, backend and documentation updates only

## Additional Notes

**Why remove the "Coming Soon" footers?**
These forward-references were creating dead links and cluttering the documentation. Removing them provides a cleaner reading experience while we work on the useToggle guide.

**Why add build steps to CI?**
Adding explicit build validation catches build-breaking changes earlier in the development process, before they reach production. This includes both the main package build and documentation build.

## Checklist

- [ ] Self-reviewed the code before requesting review
- [ ] Tests are added/updated
- [ ] Documentation is updated (if necessary)
- [ ] Breaking changes are documented (if any)
