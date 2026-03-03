# Approach

This document explains how the technical test and API were implemented in plain terms.

## What Was Built

A REST API that handles **course completion** data: it lets clients submit when a user completes a course, and supports creating, reading, updating, deleting, and listing those records. The API checks that required fields are present, returns clear errors when they are not, and returns a success response with a server-generated timestamp when validation passes.

## How It Works

### 1. Main behaviour

- **Create:** Clients send a JSON body with `user_id`, `course_id`, and `completion_status`. The API checks that all three are present and non-empty. If something is missing, it responds with a structured error (error code, message, and which field failed). If validation passes, the record is stored in the database, list cache is invalidated in the background, and the API returns success with the new record and a server-generated timestamp.
- **Read one:** Given an ID in the URL, the API returns that course completion from the database (no caching), or a “not found” error.
- **List:** Clients send a POST body with optional `filter` and options like `sortBy`, `sortType`, `limit`, and `page`. Results are cached in Redis by request body so repeated identical requests are served from cache until the list cache is invalidated.
- **Update / Delete:** The API checks that the record exists and (for update) that it is not deleted, then updates or deletes it. After a successful change, the list cache is invalidated in the background so the next list request sees fresh data.

### 2. Technology choices

- **Node.js and TypeScript** for type safety and maintainability.
- **Express** for HTTP and routing.
- **Prisma with PostgreSQL** for storing course completion records in a clear schema.
- **Redis** for caching list results; cache keys use a versioned prefix and request-body hash. Invalidation is done in a non-blocking way so responses are not delayed by cache updates.
- **Joi** for validating request bodies and params; validation lives next to the course-completion routes.
- **Central error handling** so validation and server errors return a consistent JSON shape (code, message, and optional details).

### 3. Project structure

- **`course_completion`** – One feature folder containing controller, service, validation, routes, and index. Each file is named like `course.completion.controller.ts` for clarity.
- **Config** – Central config and logger (e.g. `config/config.ts`, `config/logger.ts`).
- **Utils** – Shared helpers: cache (get/set/invalidate by key or prefix), API response shapes, catchAsync for async errors, ApiError for HTTP errors.
- **Middlewares** – Validation (Joi-based), error converter and error handler so all errors go through one path.

### 4. Caching strategy

- **List (fetch):** Cache key is built from a prefix and the full request body (filter + options). Identical requests get cached list and count; cache is invalidated by prefix when any create, update, or delete runs (invalidation is fire-and-forget so it does not block the response).
- **Get one:** Not cached; every request hits the database so data is always up to date.

## Summary

The solution meets the brief: a POST endpoint that accepts the required JSON, validates the three fields, returns a clean structured error when validation fails, and returns a success response with a server-generated timestamp when it passes. The implementation adds full CRUD, list with pagination/sort/filter, Redis-backed list caching with prefix invalidation, and a clear structure so the code is easy to follow and extend.
