# Railway Deployment Guide – Why It Failed & How It’s Fixed

## 1. Why It Fails on Railway But Works Locally

| Factor | Local (Windows) | Railway (Linux) |
|--------|------------------|-----------------|
| **OS** | Windows | Linux (Debian) |
| **Yarn lockfile checksums** | Match (generated on same OS) | Often **mismatch** (different tarball bytes) → `YN0018` |
| **Yarn install command** | `yarn install` (flexible) | Railpack runs `yarn install --check-cache` (strict) → fails on checksum |
| **TypeScript compat patch** | May apply or be skipped | **Fails to apply** → `YN0066 Cannot apply hunk` (line endings / patch format) |
| **Project files in /app** | Always present | Only present if Railpack install step has correct **inputs** |

So: same lockfile and config work locally but hit checksum + patch + context issues on Railway.

---

## 2. Is It a Yarn v3 / PnP Issue?

**No.** You are **not** using PnP:

- `.yarnrc.yml` has **`nodeLinker: node-modules`** → classic `node_modules` layout.
- Prisma and other tools work with `node_modules`; no PnP-specific fixes are required.

Railway’s Railpack uses **Yarn 2.4.3** (Berry) with `node-modules`. The problems are checksums, the TypeScript **compat patch**, and install step context—not PnP.

---

## 3. Is It a TypeScript Patch Issue?

**Yes.** One of the failures is the **TypeScript compat patch**:

- Yarn’s **plugin-compat** adds an optional patch for TypeScript (`builtin<compat/typescript>`).
- On Linux/CI that patch often fails with **YN0066: Cannot apply hunk #1** (e.g. line endings or patch content).
- When it fails, `yarn install` exits with code 1 and the build fails.

**What we did:**

- Pinned TypeScript to **5.6.3** (exact version).
- Added **`resolutions`** so the app uses the plain npm package:  
  `"typescript": "npm:typescript@5.6.3"`.
- **Removed the TypeScript patch entry** from `yarn.lock` so install never tries to apply that patch on Railway.

---

## 4. Should You Switch to npm?

**Not required.** The current setup is fixed for Railway with Yarn:

- **`.yarnrc.yml`**: `checksumBehavior: ignore` avoids lockfile checksum mismatches.
- **`railpack.json`**: install step uses `yarn install` (no `--check-cache`) and has the right **inputs** so `/app` has your project.
- **`package.json`**: TypeScript resolution + pin so no compat patch is used.
- **`yarn.lock`**: no `typescript@patch` / `compat/typescript` entry.

If you ever want to use npm on Railway, you’d add `package-lock.json`, remove or rename `yarn.lock`/`.yarnrc.yml`, and set Railpack/Railway to use npm; the rest of the app (Node, Prisma, build/start) is the same.

---

## 5. Exact Minimal Fix (What’s Already Done)

1. **`.yarnrc.yml`**  
   - `nodeLinker: node-modules`  
   - `checksumBehavior: ignore`

2. **`railpack.json`**  
   - Install step: `inputs` = `packages:mise` + local `"."`, command = `yarn install`.

3. **`package.json`**  
   - `resolutions`: `"typescript": "npm:typescript@5.6.3"`  
   - `devDependencies.typescript`: `"5.6.3"` (exact).

4. **`yarn.lock`**  
   - No `typescript@patch:...optional!builtin<compat/typescript>` block.

5. **`railway.json`**  
   - Builder: RAILPACK, build: `yarn build`, start: `yarn start`.

6. **`.node-version`**  
   - `20` (Railway uses Node 20.x).

---

## 6. Node Version Mismatch

- **Local:** Node v20.19.5  
- **Railway:** Node 20.20.0 (from `.node-version` / Railpack).

Same major/minor (20.x). **Node version is not the cause** of the install failure; the failures are Yarn checksums, TypeScript patch, and install step context.

---

## 7. Step-by-Step Fix (Checklist)

### Step 1: Confirm these files

- [ ] **`.yarnrc.yml`** – `nodeLinker: node-modules` and `checksumBehavior: ignore`
- [ ] **`railpack.json`** – install step with `inputs` and `commands: ["yarn install"]`
- [ ] **`package.json`** – `resolutions.typescript` and `devDependencies.typescript` set as above
- [ ] **`yarn.lock`** – no `typescript@patch` / `compat/typescript` block (search for `patch:typescript` or `compat/typescript`; there should be no matches)

### Step 2: Avoid re-introducing the TypeScript patch

- **Do not run `yarn install`** before pushing if your goal is to keep the lockfile without the TypeScript patch.
- If you must run `yarn install` (e.g. new dependency), after that search `yarn.lock` for `typescript@patch` or `compat/typescript`. If that block is back, remove that full block from `yarn.lock` again, then commit.

### Step 3: Commit and push

```bash
git add package.json .yarnrc.yml railpack.json railway.json .node-version yarn.lock
git status   # ensure no unintended files
git commit -m "fix: Railway deploy - Yarn checksums, Railpack install, TypeScript patch"
git push
```

### Step 4: Railway env vars

In Railway project → your service → **Variables**, set:

- `DATABASE_URL` (Postgres)
- `REDIS_URL` (Redis)

(And any others your app needs.)

### Step 5: Deploy

Trigger a new deploy on Railway. Build should:

1. Run **install** with `yarn install` (no `--check-cache`) in a context that includes your project (thanks to `railpack.json`).
2. Complete without TypeScript patch (thanks to `resolutions` + cleaned lockfile).
3. Run **build**: `yarn build` → `prisma generate && tsc`.
4. Run **start**: `yarn start` → `node dist/index.js`.

### Step 6: If it still fails

- Paste the **full Railway build log** (from “Preparing” through the failing step).
- Check that the **same** `package.json`, `.yarnrc.yml`, `railpack.json`, and `yarn.lock` (without TypeScript patch) are what Railway is building from (correct branch/root).

---

## Summary

- **Why Railway failed:** Lockfile checksums (Windows vs Linux), strict `--check-cache`, TypeScript compat patch failing on Linux, and install step not having project files in `/app`.
- **Not PnP:** You use `node-modules`.
- **TypeScript:** Fixed by resolution + pin + removing the patch from `yarn.lock`.
- **No need to switch to npm** for this to work.
- **Node version** is aligned (20.x) and not the cause.
- **Minimal fix:** The six items in section 5, plus following the checklist and not re-adding the TypeScript patch when you run `yarn install` locally.
