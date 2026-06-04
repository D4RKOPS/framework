# Framework Layers

> **GitHub repo:** _Replace this line with the link once the repository is published._

This document describes the layered architecture of the API testing framework, the rationale for each layer, and how the layers interact. A `.docx` version of this document must be generated from this markdown for the homework submission (e.g. with Pandoc: `pandoc docs/framework-layers.md -o docs/framework-layers.docx`).

## Overview
The framework follows a layered approach used in mature API automation projects. Each layer has a single responsibility and depends only on layers below it, which makes tests readable, maintainable, and resistant to change in the underlying API or HTTP library.

Layers, top-down:

1. **Test Layer** — `tests/**/*.spec.js` — what we verify.
2. **Service / Client Layer** — `src/clients/PostsClient.js`, `UsersClient.js` — how we call the API.
3. **Core / Base Layer** — `src/clients/BaseApiClient.js` — transport and cross-cutting concerns.
4. **Model / Data Layer** — `src/models/`, `src/data/` — what we send.
5. **Config Layer** — `src/config/env.js`, `playwright.config.js` — where and how we run.
6. **Utils Layer** — `src/utils/logger.js`, `src/utils/schemaValidator.js` — reusable helpers.
7. **Reporting Layer** — Playwright HTML report — results.

## 1. Test Layer (`tests/`)
Specifications written with Playwright Test. They describe business intent, not HTTP mechanics. Each test:

- Instantiates the resource client.
- Builds a payload from the Model layer.
- Calls the endpoint.
- Asserts status, body, and JSON Schema.

**Why:** tests stay short and readable; reviewers see the scenario, not request boilerplate.

## 2. Service / Client Layer (`src/clients/`)
One class per API resource. Exposes domain methods (`getById`, `create`, `update`) instead of raw URLs.

**Why:** centralizes endpoint paths; if the API changes, only one file is updated.

## 3. Core / Base Layer (`src/clients/BaseApiClient.js`)
A thin wrapper over Playwright's `APIRequestContext` that provides `get/post/put/delete`. Hosts cross-cutting concerns: logging, default headers, and future retries or authentication.

**Why:** resource clients stay tiny and cross-cutting policies live in one place.

## 4. Model / Data Layer (`src/models/`, `src/data/`)
- **Models** are builders/factories for request payloads with sensible defaults and overrides, for example `PostModel.valid({ title: '...' })`.
- **Data** holds constants and fixtures such as existing ids and expected counts.

**Why:** eliminates duplicated literals across tests and makes data variations explicit.

## 5. Config Layer (`src/config/env.js`, `playwright.config.js`)
Reads `BASE_URL` and timeouts from environment variables (`.env`), and configures Playwright (reporters, parallelism, default headers).

**Why:** the same framework runs against local, staging, or production by swapping env vars.

## 6. Utils Layer (`src/utils/`)
- `logger.js`: lightweight logger.
- `schemaValidator.js`: wraps Ajv to validate responses against the JSON Schemas under `tests/schemas/`.

**Why:** contract validation catches breaking API changes that field-by-field assertions miss.

## 7. Reporting Layer
Playwright's built-in HTML reporter (`playwright-report/`) plus the `list` console reporter. Accessible with `npm run report`.

**Why:** zero extra dependencies, traces and attachments built-in.

## Dependency rules
- Tests depend on Clients, which depend on Base, which depends on Playwright's `request`.
- Tests may read Models and Data.
- Any layer may use Utils and Config.
- No upward dependencies: clients never know about tests.

## Extending the framework
- **New resource (e.g. `/comments`):** add `CommentsClient`, optional `CommentModel`, JSON Schema, and spec files. No changes elsewhere.
- **Authentication:** add token handling to `BaseApiClient` and credentials to the Config layer.
- **New environment:** add an `.env.<env>` file and select it via `BASE_URL`.
