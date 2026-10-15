# Agentic full-stack workflow

This repository contains a reusable, cost-aware workflow for full-stack engineering assistants. It is configuration and guidance, not an application stack.

Start with the task's exact files and direct dependencies. Follow the target project's own stack, folder layout, commands, API conventions, and test runner; do not assume a framework or repository structure.

Use the shared contract template in `.codex/templates/contract.md`, role guidance in `.codex/agents/`, and routing in `.codex/workflow.yml`. Keep context focused, use the cheapest capable model, prefer local tools, and use MCP only for necessary external context or actions.

Validate the workflow with `node scripts/validate-workflow.mjs`.
