---
name: agentic-fullstack-development
description: Plan, implement, test, and review React, TypeScript, JavaScript, or Node.js full-stack changes as small, safe, reviewable vertical slices.
---

# Agentic Full-Stack Development

Use this skill when a user asks to build or change a full-stack feature and expects a workflow covering requirements, implementation, tests, and pull-request review.

## Workflow

1. Inspect the relevant repository structure, package scripts, existing implementation, tests, and CI before editing.
2. Write a concise requirement brief: goal, actors, acceptance criteria, scope boundaries, assumptions, open questions, and risks. Do not invent product behavior that affects scope, security, or data safety.
3. Propose a dependency-ordered implementation plan naming the affected files, contracts, test levels, and verification commands.
4. Implement the smallest vertical slice using existing boundaries and conventions. Keep HTTP concerns in routes/controllers, business rules in services, persistence in models, and UI concerns in React components/features. Reuse existing API, validation, authentication, and error-handling patterns.
5. Add or update tests for each acceptance criterion, including meaningful failure-path coverage. Prefer unit tests for pure rules, API tests for contracts/auth/validation, integration tests for persistence/ownership, component tests for UI states, and E2E tests for cross-stack journeys.
6. Run targeted tests first, then relevant lint/build/CI-equivalent checks. Report environment limitations separately from product failures.
7. Review the final diff independently as a pull request. Check requirement coverage, correctness, security, compatibility, test quality, operability, maintainability, unrelated scope, and missing coverage. Report findings with severity and file/line references.

## MCP cost-efficiency

Default to zero MCP calls and local tools for repository work. Use the lowest-cost capable model and the smallest sufficient context. The full budget, escalation and tool-routing rules are in the "MCP integration and cost control" section of `docs/AGENTIC_WORKFLOW.md`; read that section only when an external call is actually needed. Report any MCP calls and external mutations in the final response.

## Target-project conventions

Follow the target project's existing boundaries and commands. Do not assume a framework, folder layout, API schema format, database, or test runner. Read `docs/FEATURE_WORKFLOW.md` and only the relevant role prompt under `.codex/agents/`. Use the planner to establish the shared contract before parallel client/server work; use the lookup role for small retrieval tasks.

## Safety and scope

- Keep the working tree runnable after each change.
- Never commit or expose secrets, tokens, personal data, or unrestricted database output.
- Preserve authentication, authorization, CSRF, input validation, and ownership checks.
- Avoid unrelated refactors, dependency upgrades, formatting churn, or destructive commands.
- A human owns product decisions, credentials, migrations, and final merge approval.

## Final response

Summarize the requirement, plan, implemented files, tests/checks run, review findings, remaining risks, and any human decisions required. Only claim a check passed when its command completed successfully.
