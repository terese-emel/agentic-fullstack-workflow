# Assistant adapters

The workflow itself is assistant-neutral. `AGENTS.md` is the canonical instruction file; the other files are small entry points for tools that use different conventions.

| Assistant | Entry point | How to use it |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` | Keep this file as a short pointer to `AGENTS.md`. |
| GitHub Copilot | `.github/copilot-instructions.md` | Copilot reads the adapter and follows the shared workflow. |
| Codex | `AGENTS.md` | Codex reads the canonical project instructions. |

If an assistant supports only one instruction file, point it at `AGENTS.md`. Do not duplicate the full workflow across adapters; duplication causes the assistants to drift apart.
