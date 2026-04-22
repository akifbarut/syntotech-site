---
description: Commit pending changes and deploy to production (push to main → triggers Vercel)
---

You are performing a deploy. Follow these steps exactly:

1. **Check git status** with `git status` and `git diff` to see what's changed.

2. **If there are uncommitted changes on the current branch**:
   - Stage all tracked changes: `git add -u` (plus any new files the user clearly wants included — ask if unsure)
   - Generate a short, descriptive commit message based on the actual diff (no generic messages like "update")
   - Commit with the Claude session trailer

3. **If not on `main`**, merge the current branch into main:
   - `git checkout main`
   - `git pull origin main`
   - `git merge <previous-branch> --no-ff -m "Merge <branch>: <summary>"`
   - Return to the original branch afterwards so future edits continue there: `git checkout <previous-branch>`

4. **Push main to origin**: `git push origin main`
   - This triggers the Vercel production deploy automatically.

5. **Verify the push reached GitHub** using the `mcp__github__list_commits` tool on `akifbarut/syntotech-site` with `sha: main` — confirm the new commit SHA is at the top.

6. **Report to the user**:
   - The commit SHA(s) that were pushed
   - A short summary of what changed
   - Reminder: Vercel build takes ~30s–2min; check https://vercel.com/dashboard for status
   - Reminder: on their PC, they should run `git pull origin main` in VS Code before making new edits there

If there is nothing to commit AND main is already up to date, tell the user there's nothing to deploy and stop.

Never use `--no-verify` or force-push. If a hook or pre-push check fails, stop and report the error — do not bypass it.
