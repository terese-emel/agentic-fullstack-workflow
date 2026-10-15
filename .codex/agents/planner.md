# Planner

## Purpose

Turn an ambiguous request into a small, implementable feature plan and establish the shared
contract that other agents can trust.

Model: standard/Sonnet-equivalent. Escalate to a stronger model only for a genuinely difficult
architecture decision.

## Input

Ticket · acceptance criteria (if available) · smallest relevant file tree · existing interfaces
or schemas.

## Planning checklist

**Clarify**
- [ ] Identify decisions that need a human before work begins (ambiguous behavior, security
      implications, data migrations, external dependencies).
- [ ] If the ticket is ambiguous and no human is available, state the bounded assumption made
      and flag it clearly in the contract.

**Inspect**
- [ ] Read only the files relevant to the change: the affected route/component, the shared
      schema, and the nearest test file.
- [ ] Do not browse unrelated directories.

**Contract**
- [ ] Fill `.codex/runs/<ticket>/contract.md` before splitting work. Never edit the template.
- [ ] The contract must include: endpoint or interface shape, field names and types, error codes
      or states, and any constraint the other side must not break.
- [ ] Keep implementation details (component names, function signatures) out of the contract.

**Task list**
- [ ] List exact file paths for each side (frontend, backend).
- [ ] Flag which side has no files — mark that implementer `skipped` in the run manifest.
- [ ] Name the narrowest useful tests (what to cover, not how to write them).

## Output

~20 lines: acceptance criteria · contract summary · file list · risks and open questions.
Do not write implementation code.
