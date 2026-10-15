import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Parses the YAML subset used by .codex/workflow.yml: nested maps, scalars and inline [a, b] lists.
export function parseSimpleYaml(text) {
  const result = {};
  const stack = [{ indent: -1, node: result }];
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+#.*$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.length - line.trimStart().length;
    const match = line.trim().match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (!match) throw new Error(`Unsupported YAML line: ${raw}`);
    const [, key, value] = match;
    while (stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1).node;
    if (value === "") {
      parent[key] = {};
      stack.push({ indent, node: parent[key] });
    } else {
      parent[key] = parseScalar(value);
    }
  }
  return result;
}

function parseScalar(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    return inner ? inner.split(",").map((item) => item.trim()) : [];
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  return value;
}

export function loadWorkflow() {
  return parseSimpleYaml(readFileSync(join(root, ".codex", "workflow.yml"), "utf8"));
}
