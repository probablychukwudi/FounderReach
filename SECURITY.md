# Security

FounderReach is a public portfolio project. Please do not open public issues with sensitive vulnerability details, credentials, private tokens, or personal data.

## Supported Version

The `main` branch is the actively maintained version.

## Reporting

If you find a security issue, contact the repository owner privately through GitHub before publishing details. Include:

- A short description of the issue.
- Steps to reproduce.
- The affected route, API endpoint, or file.
- Any safe proof of impact.

## Secret Handling

This repository should never contain real API keys, database service-role keys, OAuth secrets, webhook secrets, or private user data.

Use `.env.local` for local development and provider dashboards or hosting environment variables for deployed environments. `.env.local` is intentionally ignored by git.
