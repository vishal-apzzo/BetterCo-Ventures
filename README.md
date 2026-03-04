# BetterCo-Ventures

## Deploy on Railway (Railpack + Yarn)

This project is set up to deploy on [Railway](https://railway.com) using the **Railpack** builder with **Yarn**.

### What’s configured

- **Railpack** is set as the builder in `railway.json` .
- **Yarn** is used for install, build, and start (detected via `.yarnrc.yml` and `yarn.lock`).
- **Build**: `yarn build` runs `prisma generate` then `tsc`.
- **Start**: `yarn start` runs `node dist/index.js`.
- **Node**: version is pinned by `.node-version` (20) and `engines.node` in `package.json`.

### Deploy steps

1. Push this repo to GitHub (or connect your repo in Railway).
2. In [Railway](https://railway.com), create a new project and add a **GitHub** service from this repo.
3. Set **environment variables** in the service (Variables tab), for example:
   - `DATABASE_URL` – Postgres connection string (e.g. from Railway Postgres).
   - `REDIS_URL` – Redis connection string (e.g. from Railway Redis).
   - Optionally `PORT` (Railway usually sets this automatically).
4. Deploy; Railway will use Railpack to run `yarn install`, `yarn build`, then `yarn start`.

### Optional: Railpack env vars

- `RAILPACK_NODE_VERSION` – override Node version (e.g. `20` or `22`).
- `RAILPACK_PRUNE_DEPS=true` – prune dev dependencies in the production image.