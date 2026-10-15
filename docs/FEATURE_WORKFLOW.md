# Cost-efficient feature workflow

Use this as a lightweight rhythm for each feature:

1. Give the planner the ticket and only the file paths that matter.
2. Let the planner write the shared API contract and a small task list.
3. Let the frontend and backend work in parallel from that contract when it is useful.
4. Let scripts handle type checks, lint, tests, builds, and E2E checks. Show agents failures and short summaries, not long successful logs.
5. Ask the test writer to fill only the gaps that remain.
6. Give the reviewer a fresh context with the acceptance criteria and diff.
7. Keep the final approval with a human.

## Execution configuration

`.codex/workflow.yml` is the source of truth for role dependencies, per-assistant model routing, inputs, outputs, and call limits. `scripts/prepare-run.mjs` builds the run manifest from it, the Claude Code agents in `.claude/agents/` use its `claude` models, and `scripts/validate-workflow.mjs` checks that the roles, prompts, dependencies and agent files agree with it.

Start a run with `node scripts/prepare-run.mjs <ticket-id>`. This creates `.codex/runs/<ticket>/` with an empty `contract.md` copied from the template and a `manifest.json`, before any model or MCP call is made. Running it again keeps an existing contract and manifest. Run directories are git-ignored.

The planner fills `.codex/runs/<ticket>/contract.md`; nobody edits the template. Frontend and backend agents work from that contract. When the work split has no files for one side, the planner marks that implementer `skipped` and the test writer waits only on the side that runs. They may ask for a focused contract, schema, security, or CI file during review, but should not reopen the whole repository.

When parallel work is available, use isolated branches or worktrees:

```text
feature/<ticket>              # integration branch
feature/<ticket>-frontend     # frontend agent
feature/<ticket>-backend      # backend agent
```

Merge the two implementation branches only after the contract is stable. Resolve conflicts on the integration branch, then run the full relevant checks once.

The reviewer normally receives the acceptance criteria, contract, diff, and changed tests. Add security middleware, schema, deployment, or CI files only when the diff touches that risk area.

Record actual usage in `.codex/runs/<ticket>/cost.json` when the host exposes it:

```json
{
  "assistant": "claude",
  "models": {"planner": "sonnet", "lookup": "haiku"},
  "mcpCalls": 0,
  "inputTokens": null,
  "outputTokens": null
}
```

## Cost controls

- Keep `CLAUDE.md` and prompts short; bring in detailed guidance only when it is relevant.
- Give every role exact paths and a bounded output limit.
- Use the lowest-cost capable model: lookup/test mechanics first, standard reasoning for implementation, stronger reasoning only for architecture or difficult bugs.
- Use scripts for deterministic checks and summaries.
- Pass contracts and diffs between roles instead of sharing the whole repository.
- Start the next feature with a fresh context after approval so old assumptions do not linger.
- Record approximate model tier, MCP calls, and token usage per feature when available.
