---
name: jira-lookup
description: Retrieve or summarize a Jira issue using the smallest possible context and lowest-cost capable model; use for simple ticket lookups, not implementation planning.
---

# Jira lookup

Use this skill when the user asks for a Jira issue's title, status, assignee, priority, description, acceptance criteria, or a short summary.

## Workflow

1. Identify the issue key and exactly which fields the user wants.
2. Use the configured Jira MCP integration if one is available. Otherwise ask for the ticket content or explain that Jira access is unavailable.
3. Make one bounded read request for only the requested fields.
4. Return a concise answer with the issue key and source when available.

## Cost and safety

- Use the lowest-cost capable model and minimal context.
- Do not inspect the repository, start implementation planning, or retrieve comments, attachments, history, or linked issues unless requested.
- Do not mutate Jira issues, add comments, transition status, or assign work from this skill.
- Never expose credentials, tokens, or unrelated ticket data.
- If the issue is ambiguous or the requested field is unavailable, say so rather than making up a value.
