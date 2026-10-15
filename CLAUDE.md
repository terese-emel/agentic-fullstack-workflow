# Agentic full-stack workflow context

## Purpose

This repository contains a reusable, cost-aware workflow for full-stack engineering agents. It is configuration and guidance, not an application stack.

## Commands

- Validate the workflow: `node scripts/validate-workflow.mjs`

## A few habits to keep us aligned

- Start with the files named in the task and follow direct dependencies only when needed.
- Let the planner create `.codex/templates/contract.md` before frontend and backend work begins.
- Pass exact paths, contracts, diffs, and failures between roles rather than the whole repository.
- Add success and failure-path tests for changed behavior.
- Never expose secrets or commit environment files.
- Prefer local scripts and small MCP calls. Use the cheapest model that can do the job well.

Detailed guidance is in `docs/AGENTIC_WORKFLOW.md`, the execution sequence is in `docs/FEATURE_WORKFLOW.md`, and routing lives in `.codex/workflow.yml`.
