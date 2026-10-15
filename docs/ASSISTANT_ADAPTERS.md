# Assistant adapters

The workflow itself is assistant-neutral. `AGENTS.md` is the canonical instruction file; the other files are small entry points for tools that use different conventions.

| Assistant | Entry point | How to use it |
| --- | --- | --- |
| Claude Code | `CLAUDE.md`, `.claude/agents/` | `CLAUDE.md` imports `AGENTS.md` with an `@AGENTS.md` line (plain markdown links are not loaded). Each role has a thin agent file in `.claude/agents/` with a `model` matching `models.claude` in `workflow.yml`; it points to the canonical prompt in `.codex/agents/`. |
| GitHub Copilot | `.github/copilot-instructions.md` | Copilot reads the adapter and follows the shared workflow. |
| Codex | `AGENTS.md` | Codex reads the canonical project instructions. |

If an assistant supports only one instruction file, point it at `AGENTS.md`. Do not duplicate the full workflow across adapters; duplication causes the assistants to drift apart.

Portable skills live under `.agents/skills/`, following the Agent Skills convention. The `.codex/skills/` directory remains as a Codex-specific compatibility location.

## Jira integration

For a simple ticket lookup, use `.codex/skills/jira-lookup/SKILL.md` and `.codex/agents/jira-lookup.md`. When terminal access to Jira Cloud is preferred, use `.codex/skills/jira-acli/SKILL.md`. Configure the Jira MCP connector or `acli` separately; the workflow does not hardcode credentials or a Jira host. If no connector is available, provide the ticket text directly.
