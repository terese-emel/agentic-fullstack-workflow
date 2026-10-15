# Copilot instructions

Use this repository's generic agent workflow. Read `AGENTS.md` for the shared rules, then consult only the relevant role prompt in `.codex/agents/` and the feature process in `docs/FEATURE_WORKFLOW.md`.

Do not assume a particular framework, folder layout, database, API schema, or test runner. Discover the target project's conventions first. Use the lowest-cost capable model and the smallest useful context. Prefer local tools and bounded MCP calls.

For feature work, establish a shared contract before splitting client and server tasks. Add success and failure-path tests, run the target project's own checks, and review the final diff independently.
