# Agentic Full-Stack Workflow

A practical, cost-aware workflow for using AI agents across full-stack development: requirements, API contracts, React and Node.js implementation, testing, and pull-request review.

## What is included

- A short always-loaded project context in [`CLAUDE.md`](CLAUDE.md)
- Role prompts for planning, frontend/backend implementation, testing, lookup tasks, and review in [`.codex/agents/`](.codex/agents/)
- The complete workflow in [`docs/AGENTIC_WORKFLOW.md`](docs/AGENTIC_WORKFLOW.md)
- The lightweight contract-first feature process in [`docs/FEATURE_WORKFLOW.md`](docs/FEATURE_WORKFLOW.md)
- A pull-request checklist in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)

## Design goals

- Keep context small and focused.
- Use the lowest-cost capable model for each task.
- Use MCP servers only when they add necessary external context or actions.
- Let scripts handle deterministic checks such as linting, tests, builds, and type checks.
- Keep a human responsible for product decisions and final approval.

The workflow is intentionally stack-aware but not tied to one framework. It can be adapted to React, TypeScript, JavaScript, Node.js, and similar full-stack projects.
