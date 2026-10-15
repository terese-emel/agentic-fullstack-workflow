#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadWorkflow, root } from "./workflow-config.mjs";

const ticket = process.argv[2];

if (!ticket || !/^[A-Za-z0-9._-]+$/.test(ticket)) {
  console.error("Usage: node scripts/prepare-run.mjs <ticket-id>");
  process.exit(1);
}

const workflow = loadWorkflow();
const runDir = join(root, ".codex", "runs", ticket);
mkdirSync(runDir, { recursive: true });

const contract = join(runDir, "contract.md");
if (existsSync(contract)) {
  console.log(`Kept existing ${contract}`);
} else {
  copyFileSync(join(root, ".codex", "templates", "contract.md"), contract);
}

const roles = workflow.feature_run.map((name) => {
  const deps = workflow.roles[name].depends_on ?? [];
  return {
    name,
    status: deps.length ? `blocked-on:${deps.join(",")}` : "pending",
    ...(workflow.roles[name].optional ? { optional: true } : {}),
  };
});

const manifestPath = join(runDir, "manifest.json");
if (existsSync(manifestPath)) {
  console.log(`Kept existing ${manifestPath}`);
} else {
  const manifest = {
    ticket,
    status: "ready-for-planning",
    next: roles.find((role) => role.status === "pending")?.name,
    roles,
    notes: "Run deterministic checks locally; add cost.json when usage is available.",
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`Prepared ${runDir}`);
console.log("Next: run the planner with the ticket and relevant paths; it fills contract.md in this directory.");
