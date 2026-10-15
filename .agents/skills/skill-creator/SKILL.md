---
name: skill-creator
description: Create or improve portable agent skills that follow the Agent Skills specification and work across Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex, and other compatible clients. Use when creating a reusable skill, packaging a workflow as SKILL.md, improving a skill description, or adding a skill under .agents/skills.
---

# Portable Skill Creator

Create small, reusable skills that any skills-compatible assistant can discover and use. Keep the skill focused on one capability and avoid putting vendor-specific assumptions in its core instructions.

## Skill structure

Create a directory under `.agents/skills/<skill-name>/` containing:

```text
skill-name/
├── SKILL.md
├── scripts/       # optional deterministic helpers
├── references/    # optional details loaded only when needed
└── assets/        # optional templates or static files
```

Use lowercase letters, digits, and single hyphens for the directory and `name`. Keep the name under 64 characters and make it match the directory name. Avoid assistant or vendor names when the skill should work across clients.

## Write `SKILL.md`

Use YAML frontmatter with `name` and `description`. The description is the discovery trigger, so explain both what the skill does and when it should activate. Include concrete terms users are likely to mention.

In the body, explain the purpose, inputs, workflow, boundaries, safety concerns, and expected output. Prefer clear imperative guidance and explain why a constraint matters. Keep the body under about 500 lines; move detailed or mode-specific material into focused references.

## Add resources only when useful

- Add a script when deterministic, repeated work is cheaper and more reliable than asking an agent to recreate it.
- Add a reference when the information is substantial or only needed for one mode.
- Add an asset when the skill produces or adapts a reusable file.

Link every optional resource from `SKILL.md` and keep references close to the skill. Do not add placeholder files, generic READMEs, or copied manuals.

## Test and refine

Try at least two realistic prompts: one normal request and one edge case or near miss. Check that the description triggers the skill when it should and stays quiet for adjacent tasks. Check that the body leads to the intended output without unnecessary exploration or tool calls.

Before sharing, verify:

- The folder and frontmatter names match.
- The description includes capability and trigger context.
- The skill is portable and does not require a specific assistant.
- Secrets and unauthorized external actions are excluded.
- Scripts and references are actually usable.
- The skill stays concise and avoids duplicating global instructions.

If an official Agent Skills validator is available, run it against the skill directory. Otherwise, perform the checks above and report any validator limitation honestly.
