#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadWorkflow, root } from "./workflow-config.mjs";

const required = [
  "CLAUDE.md",
  "AGENTS.md",
  ".gitignore",
  ".github/copilot-instructions.md",
  ".agents/skills/skill-creator/SKILL.md",
  "docs/ASSISTANT_ADAPTERS.md",
  ".codex/workflow.yml",
  ".codex/templates/contract.md",
  ".codex/skills/jira-lookup/SKILL.md",
  ".codex/skills/jira-acli/SKILL.md",
  "docs/AGENTIC_WORKFLOW.md",
  "docs/FEATURE_WORKFLOW.md",
];
const requiredRoles = ["lookup", "jira_lookup", "planner", "frontend_implementer", "backend_implementer", "test_writer", "reviewer"];
const claudeModels = new Set(["haiku", "sonnet", "opus", "inherit"]);

const errors = [];
const isFile = (file) => existsSync(join(root, file)) && statSync(join(root, file)).isFile();

for (const file of required) {
  if (!isFile(file)) errors.push(`Missing ${file}`);
}

if (!/^@AGENTS\.md\s*$/m.test(readFileSync(join(root, "CLAUDE.md"), "utf8"))) {
  errors.push("CLAUDE.md must import AGENTS.md with an `@AGENTS.md` line");
}
if (!/^\.codex\/runs\/\s*$/m.test(readFileSync(join(root, ".gitignore"), "utf8"))) {
  errors.push(".gitignore must ignore .codex/runs/");
}

let workflow;
try {
  workflow = loadWorkflow();
} catch (error) {
  errors.push(`.codex/workflow.yml: ${error.message}`);
}

if (workflow) {
  const roles = workflow.roles ?? {};
  const providers = workflow.models ?? {};
  if (!Object.keys(providers).length) errors.push("workflow.yml has no models");

  for (const role of requiredRoles) {
    if (!roles[role]) errors.push(`Missing role under roles: ${role}`);
  }

  for (const [name, role] of Object.entries(roles)) {
    if (!role.prompt || !isFile(role.prompt)) errors.push(`Role ${name}: prompt ${role.prompt ?? "(none)"} not found`);
    if (!role.output) errors.push(`Role ${name}: missing output`);
    for (const dep of role.depends_on ?? []) {
      if (!roles[dep]) errors.push(`Role ${name}: depends_on unknown role ${dep}`);
    }
    for (const [provider, models] of Object.entries(providers)) {
      if (!models[name]) errors.push(`Role ${name}: no ${provider} model`);
    }
    const agentFile = `.claude/agents/${name.replaceAll("_", "-")}.md`;
    if (!isFile(agentFile)) {
      errors.push(`Role ${name}: missing Claude Code agent ${agentFile}`);
      continue;
    }
    const agent = readFileSync(join(root, agentFile), "utf8");
    const model = agent.match(/^model:\s*(\S+)/m)?.[1];
    if (!agent.startsWith("---\n") || !/^name:\s*\S+/m.test(agent) || !/^description:\s*\S+/m.test(agent)) {
      errors.push(`${agentFile}: needs frontmatter with name and description`);
    }
    if (!claudeModels.has(model)) errors.push(`${agentFile}: model must be one of ${[...claudeModels].join(", ")}`);
    if (providers.claude?.[name] && model !== providers.claude[name]) {
      errors.push(`${agentFile}: model ${model} differs from workflow.yml (${providers.claude[name]})`);
    }
    if (!agent.includes(role.prompt)) errors.push(`${agentFile}: must point to ${role.prompt}`);
  }

  for (const name of workflow.feature_run ?? []) {
    if (!roles[name]) errors.push(`feature_run lists unknown role ${name}`);
  }
}

for (const file of readdirSync(join(root, ".codex/agents"))) {
  if (!file.endsWith(".md")) continue;
  const lines = readFileSync(join(root, ".codex/agents", file), "utf8").split("\n").length;
  if (lines > 60) errors.push(`.codex/agents/${file} is ${lines} lines; keep role prompts focused`);
}

if (errors.length) {
  console.error(errors.map((error) => `ERROR: ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Workflow configuration is valid (${required.length} files, ${Object.keys(workflow.roles).length} roles checked).`);
