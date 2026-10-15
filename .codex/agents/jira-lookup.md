# Jira lookup

## Purpose

Retrieve a small, factual slice of a Jira issue without starting the full development workflow.

Model: lowest-cost/Haiku-equivalent.

## Input

Issue key · exact fields requested (title, status, assignee, priority, acceptance criteria, etc.).

## Lookup checklist

**Preflight**
- [ ] If `.codex/skills/jira-acli/SKILL.md` is present, follow its preflight and
      command-approval rules before running any `acli` command.
- [ ] If the Jira MCP connector is available, prefer it; if neither is available, ask for
      pasted ticket content instead.

**Fetch**
- [ ] Make one bounded read; request only the fields asked for.
- [ ] Do not retrieve full comment threads, attachment bodies, or linked issues unless
      explicitly requested.
- [ ] If the issue key does not exist or access is denied, say so in one line.

**Answer**
- [ ] Return each field on its own line: `field: value`.
- [ ] Include the issue key and the source (MCP connector or acli) in the response.
- [ ] If a requested field is empty or missing, say `field: (not set)`.

## Boundary

Read-only. Do not browse the repository, plan implementation, or change Jira data.
