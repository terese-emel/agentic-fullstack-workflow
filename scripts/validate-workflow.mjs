#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const required = [
  "CLAUDE.md",
  ".codex/workflow.yml",
  ".codex/templates/contract.md",
  ".codex/agents/planner.md",
  ".codex/agents/frontend-implementer.md",
  ".codex/agents/backend-implementer.md",
  ".codex/agents/test-writer.md",
  ".codex/agents/reviewer.md",
  ".codex/agents/lookup.md",
  "docs/AGENTIC_WORKFLOW.md",
  "docs/FEATURE_WORKFLOW.md",
];

const errors = [];
for (const file of required) {
  try {
    if (!statSync(join(root, file)).isFile()) errors.push(`${file} is not a file`);
  } catch {
    errors.push(`Missing ${file}`);
  }
}

const config = readFileSync(join(root, ".codex/workflow.yml"), "utf8");
for (const role of ["lookup", "planner", "frontend_implementer", "backend_implementer", "test_writer", "reviewer"]) {
  if (!new RegExp(`^\\s+${role}:`, "m").test(config)) errors.push(`Missing role: ${role}`);
}

const agentFiles = readdirSync(join(root, ".codex/agents"));
for (const file of agentFiles) {
  if (!file.endsWith(".md")) continue;
  const lines = readFileSync(join(root, ".codex/agents", file), "utf8").split("\n").length;
  if (lines > 40) errors.push(`${relative(root, join(root, ".codex/agents", file))} is ${lines} lines; keep role prompts focused`);
}

if (errors.length) {
  console.error(errors.map((error) => `ERROR: ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Workflow configuration is valid (${required.length} required files checked).`);
