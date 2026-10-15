#!/usr/bin/env node

import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const ticket = process.argv[2];

if (!ticket || !/^[A-Za-z0-9._-]+$/.test(ticket)) {
  console.error("Usage: node scripts/prepare-run.mjs <ticket-id>");
  process.exit(1);
}

const runDir = join(root, ".codex", "runs", ticket);
mkdirSync(runDir, { recursive: true });
cpSync(join(root, ".codex", "templates", "contract.md"), join(runDir, "contract.md"));

const manifest = {
  ticket,
  status: "ready-for-planning",
  next: "planner",
  roles: [
    { name: "planner", status: "pending" },
    { name: "frontend_implementer", status: "blocked-on-planner" },
    { name: "backend_implementer", status: "blocked-on-planner" },
    { name: "test_writer", status: "blocked-on-implementers" },
    { name: "reviewer", status: "blocked-on-tests" },
  ],
  notes: "Run deterministic checks locally; add cost.json when usage is available.",
};

writeFileSync(join(runDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${runDir}`);
console.log("Next: fill contract.md, then run the planner with the ticket and relevant paths.");
