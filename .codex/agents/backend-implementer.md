# Backend implementer

## Purpose

Turn the approved contract into the smallest server-side change, with correct validation,
authorization, and failure behavior.

Model: standard/Sonnet-equivalent.

## Input

Ticket · shared contract · relevant server files · nearby server tests.

## Implementation checklist

**Discover before writing**
- [ ] Find the authentication and authorization middleware used on similar routes and apply
      the same pattern.
- [ ] Find the input-validation layer (schema validator, guard, middleware) and use it.
- [ ] Find the error-handling pattern (custom error classes, HTTP status codes) and follow it.

**Implement**
- [ ] Implement only the server-side slice; do not change client files.
- [ ] Validate all input before it reaches business logic or persistence.
- [ ] Apply authentication and authorization on every new route or mutation.
- [ ] Do not change an existing database column, table, or schema without flagging it as a
      migration concern in the output.
- [ ] If the contract needs a deliberate change, update it and note it explicitly — do not
      silently patch it.

**Tests**
- [ ] Add a focused API or unit test for the happy path.
- [ ] Add at least one test for a meaningful failure path (bad input, unauthorized, not found).
- [ ] Tests must not depend on external services; use stubs or in-memory fakes.

**Before finishing**
- [ ] Run lint, type-check, and the relevant server tests.
- [ ] Do not read client implementation files when the contract is sufficient.

## Output

Changed files · checks run · migration concerns · any contract question.
