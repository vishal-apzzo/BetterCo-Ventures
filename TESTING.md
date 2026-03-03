# Testing Instructions

This file describes how to run the application and how to test the course completion APIs.

## Prerequisites

- **Node.js** 18 or higher  
- **Yarn**  
- **PostgreSQL** (running, with a database created)  
- **Redis** (optional; the app runs without it but will log a connection warning)

## Setup

### 1. Install dependencies

```bash
cd test-task
yarn install
```

### 2. Environment variables

Create a `.env` file in the project root (same folder as `package.json`) with at least:

- `DATABASE_URL` – PostgreSQL connection string, e.g.  
  `postgresql://USER:PASSWORD@localhost:5432/betterco_db?schema=public&sslmode=disable`
- `REDIS_URL` (optional) – e.g. `redis://localhost:6379`
- `PORT` (optional) – default is `3000`
- `NODE_ENV` (optional) – e.g. `development`

### 3. Database

Generate the Prisma client and apply migrations:

```bash
yarn prisma:generate
yarn prisma:migrate
```

### 4. Run the server

**Development (with auto-reload):**

```bash
yarn dev
```

**Production (build then start):**

```bash
yarn build
yarn start
```

The API is available at `http://localhost:3000` (or the port you set in `.env`).

---

## API Endpoints and How to Test

Base URL: `http://localhost:3000/api/course-completion`

### Health check

```bash
curl "http://localhost:3000/health"
```

Expected: `200` with `{ "status": "ok", "timestamp": "..." }`.

---

### 1. Create course completion

**Endpoint:** `POST /api/course-completion/create`  
**Body:** JSON with `user_id`, `course_id`, `completion_status` (all required).

**Example – success (200):**

```bash
curl -X POST "http://localhost:3000/api/course-completion/create" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"user-123\",\"course_id\":\"course-456\",\"completion_status\":\"completed\"}"
```

**Example – validation error (400, missing field):**

```bash
curl -X POST "http://localhost:3000/api/course-completion/create" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"user-123\",\"course_id\":\"course-456\"}"
```

Expected: `400` with a structured error listing the missing field(s).

---

### 2. List course completions

**Endpoint:** `POST /api/course-completion`  
**Body:** JSON with optional `filter` and pagination/sort: `sortBy`, `sortType`, `limit`, `page`.

**Example:**

```bash
curl -X POST "http://localhost:3000/api/course-completion" \
  -H "Content-Type: application/json" \
  -d "{\"filter\":{},\"page\":1,\"limit\":10,\"sortBy\":\"createdAt\",\"sortType\":\"desc\"}"
```

Expected: `200` with `data` (array of completions) and `count` (total count).

---

### 3. Get one course completion

**Endpoint:** `GET /api/course-completion/:courseCompletionId`

Replace `:courseCompletionId` with an actual ID (e.g. from the create response).

**Example:**

```bash
curl "http://localhost:3000/api/course-completion/ac7bcd33-02e4-4b64-8b77-4079580be6b6"
```

Expected: `200` with the single record, or `404` if not found.

---

### 4. Update course completion

**Endpoint:** `PATCH /api/course-completion/:courseCompletionId`  
**Body:** JSON with at least one of: `user_id`, `course_id`, `completion_status`.

**Example:**

```bash
curl -X PATCH "http://localhost:3000/api/course-completion/YOUR_ID" \
  -H "Content-Type: application/json" \
  -d "{\"completion_status\":\"in_progress\"}"
```

Expected: `200` with the updated record, or `404` if not found.

---

### 5. Delete course completion

**Endpoint:** `DELETE /api/course-completion/:courseCompletionId`

**Example:**

```bash
curl -X DELETE "http://localhost:3000/api/course-completion/YOUR_ID"
```

Expected: `200` with the deleted record, or `404` if not found.

---

## Testing with Postman

1. Set base URL: `http://localhost:3000/api/course-completion`.
2. For **Create:** method `POST`, URL suffix `/create`, body raw JSON with `user_id`, `course_id`, `completion_status`.
3. For **List:** method `POST`, URL suffix `/`, body raw JSON with optional `filter`, `page`, `limit`, `sortBy`, `sortType`.
4. For **Get one:** method `GET`, URL suffix `/:courseCompletionId`.
5. For **Update:** method `PATCH`, URL suffix `/:courseCompletionId`, body raw JSON with any of the three fields.
6. For **Delete:** method `DELETE`, URL suffix `/:courseCompletionId`.

Use the `id` (or `courseCompletionId`) from the create response in Get, Update, and Delete.

---

## Optional: Prisma Studio

To inspect or edit data in the database:

```bash
yarn prisma:studio
```

This opens a UI (e.g. at `http://localhost:5555`) where you can view and edit the `course_completions` table.
