# BetterCo-Ventures

BetterCo-Ventures is a production-ready REST API built with Node.js and TypeScript. It provides course completion management with PostgreSQL persistence, Redis caching, request validation, and structured logging — designed for clarity, testability, and easy deployment (e.g. Railway).

This repository contains everything required to run the API end-to-end: Express app, Prisma schema and migrations, Redis integration, and course completion CRUD with caching.

## What This System Does

- **Course completion API** — Create, read, update, list, and delete course completion records
- **Redis caching** — Configurable TTL caching for list/get operations to reduce database load
- **PostgreSQL** — Persistent storage via Prisma ORM with migrations
- **Validation** — Request validation using Joi
- **Structured logging** — Winston + Morgan for HTTP and app logs
- **Error handling** — Centralized error converter and handler middleware
- **Security** — Helmet, CORS, and env-based configuration

## Folder Structure

```
.
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   ├── logger.ts
│   │   └── morgan.ts
│   ├── course_completion/
│   │   ├── course.completion.controller.ts
│   │   ├── course.completion.route.ts
│   │   ├── course.completion.service.ts
│   │   ├── course.completion.validation.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── redis.ts
│   ├── middlewares/
│   │   ├── error.ts
│   │   └── validate.ts
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── api.response.ts
│   │   ├── cache.utils.ts
│   │   ├── catchAsync.ts
│   │   └── pick.ts
│   ├── app.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .gitignore
├── .node-version
├── package.json
├── railway.json
├── railpack.json
├── tsconfig.json
├── DEPLOYMENT.md
├── TESTING.md
└── README.md
```

---

## Tech Stack

- **Node.js** + **TypeScript**
- **PostgreSQL** — Database
- **Prisma ORM** — Schema, migrations, and type-safe client
- **Express.js** — HTTP server and routing
- **Redis** — Caching (via ioredis)
- **Joi** — Request validation
- **Winston** + **Morgan** — Logging
- **Helmet** — Security headers
- **ESLint** + **Prettier** (optional)

---

## Setup Instructions

### 1. Clone the Project

```bash
git clone <your-repo-url>
cd BetterCo-Ventures
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=development
```

---

## Prisma Setup

```bash
yarn prisma generate
yarn prisma migrate dev --name init
```

For production (e.g. Railway), run migrations separately:

```bash
yarn prisma migrate deploy
```

---

## Running the App

### Development

```bash
yarn dev
```

Runs the app with `ts-node-dev` and auto-reload on file changes.

### Build & Production

```bash
yarn build
yarn start
```

- **Build** runs `prisma generate` and `tsc`.
- **Start** runs `node dist/index.js`.

---

## API Overview

Base URL: `http://localhost:3000` (or your `PORT`).

| Method | Path | Description |
|--------|------|-------------|
| POST   | `/course-completion`     | Create a course completion |
| GET    | `/course-completion/:id` | Get one by ID (cached)      |
| PATCH  | `/course-completion/:id` | Update by ID               |
| DELETE | `/course-completion/:id` | Delete by ID               |
| POST   | `/course-completion/list`| List with filters, sort, pagination (cached) |

See **TESTING.md** for request/response examples and test scenarios.

---

## Deployment (Railway)

This project is set up to deploy on [Railway](https://railway.com) using **Railpack** and **Yarn**.

1. Push the repo to GitHub and connect it to a Railway project.
2. Add a **PostgreSQL** and optionally **Redis** service (or use external URLs).
3. In your API service, set environment variables:
   - `DATABASE_URL` — Postgres connection string
   - `REDIS_URL` — Redis connection string (optional; app may log a warning if missing)
   - `PORT` — Usually set automatically by Railway
4. Railway will run **Railpack**: `yarn install` → `yarn build` → `yarn start`.

For build/start overrides and troubleshooting, see **DEPLOYMENT.md**.

---

## Development Guidelines

- **Layers** — Controllers handle HTTP; services contain business logic and Prisma/Redis; routes and validation sit between.
- **Controllers** — Do not access the database directly; use services.
- **Services** — Use Prisma for persistence and cache utils for Redis; keep workflows testable.
- **Validation** — Use Joi schemas in `course_completion/course.completion.validation.ts` (or equivalent) and the validate middleware.
- **Errors** — Use `ApiError` and let the error middleware convert and respond.

---

## License

Private / Proprietary — All rights reserved.
