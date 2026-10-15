# Agentic Full-Stack Workflow

A practical, cost-aware workflow for using AI agents across full-stack development: requirements, API contracts, React and Node.js implementation, testing, and pull-request review.

## What is included

- A canonical assistant-neutral context in [`AGENTS.md`](AGENTS.md)
- Thin adapters for [Claude Code](CLAUDE.md) and [GitHub Copilot](.github/copilot-instructions.md)
- Role prompts for planning, frontend/backend implementation, testing, lookup tasks, and review in [`.codex/agents/`](.codex/agents/)
- Machine-readable model routing and role dependencies in [`.codex/workflow.yml`](.codex/workflow.yml)
- A shared contract template in [`.codex/templates/contract.md`](.codex/templates/contract.md)
- The complete workflow in [`docs/AGENTIC_WORKFLOW.md`](docs/AGENTIC_WORKFLOW.md)
- The lightweight contract-first feature process in [`docs/FEATURE_WORKFLOW.md`](docs/FEATURE_WORKFLOW.md)
- A pull-request checklist in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)

Validate the setup locally with:

```bash
node scripts/validate-workflow.mjs
```

Prepare a feature run without loading an agent or calling an MCP server:

```bash
node scripts/prepare-run.mjs ABC-123
```

## Design goals

- Keep context small and focused.
- Use the lowest-cost capable model for each task.
- Use MCP servers only when they add necessary external context or actions.
- Let scripts handle deterministic checks such as linting, tests, builds, and type checks.
- Keep a human responsible for product decisions and final approval.

The workflow is intentionally stack-aware but not tied to one framework, programming language, hosting provider, assistant, or repository layout. It discovers the target project's conventions instead of imposing them. See [`docs/ASSISTANT_ADAPTERS.md`](docs/ASSISTANT_ADAPTERS.md) for integration details.
