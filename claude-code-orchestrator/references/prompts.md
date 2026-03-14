# Prompt Templates

Task-specific prompts optimized to minimize Claude Code asking questions.

## fix-bug

```
Fix the following bug: {bug_description}

Context:
- File(s) involved: {files}
- Expected behavior: {expected}
- Actual behavior: {actual}

Requirements:
- Fix the root cause, not just symptoms
- Add comments explaining the fix
- Don't break existing functionality

When completely finished, run: clawdbot gateway wake --text "Done: Fixed {brief_summary}" --mode now
```

## add-feature

```
Add the following feature: {feature_description}

Requirements:
- Location: {where_to_add}
- Integration points: {integration_notes}
- Follow existing code style
- Add appropriate error handling

When completely finished, run: clawdbot gateway wake --text "Done: Added {feature_name}" --mode now
```

## refactor

```
Refactor: {refactor_description}

Scope:
- Files: {files}
- Goal: {goal} (e.g., improve readability, reduce duplication, better structure)

Constraints:
- Preserve all existing functionality
- No behavior changes unless specified
- Keep backwards compatibility

When completely finished, run: clawdbot gateway wake --text "Done: Refactored {scope}" --mode now
```

## review

```
Review this code/PR for:
- Bugs and logic errors
- Security issues
- Performance concerns
- Code style and best practices

{context_or_diff}

Output format:
1. Summary (1-2 sentences)
2. Issues found (severity: critical/warning/suggestion)
3. Specific line references
4. Recommended fixes

When completely finished, run: clawdbot gateway wake --text "Done: Review complete" --mode now
```

## Tips for Better Prompts

1. **Be specific** — "Fix the login bug" < "Fix the bug where users get logged out after 5 minutes of inactivity in auth.js"

2. **Provide context** — Include relevant file names, function names, error messages

3. **Set constraints** — "Don't modify the database schema" prevents scope creep

4. **Define done** — "Feature is complete when tests pass and the button appears on the dashboard"
