# AI Usage Documentation

> **GitHub repo:** _Replace this line with the link once the repository is published._

This document records how AI tooling was used while building this API testing framework, in compliance with item 5 of the homework.

## Tooling
- **IDE:** Windsurf.
- **AI assistant:** Cascade (agentic coding assistant inside Windsurf).
- **Model role:** pair-programming assistant. Generated code edits, suggested structure, and produced documentation drafts. No automated decisions were committed without review.

## Workflow
1. The homework brief (image) was shared with the assistant.
2. The assistant asked clarifying questions before producing a plan:
   - Tech stack (chosen: JavaScript + Playwright Test).
   - Public API (chosen: JSONPlaceholder).
   - Runner / HTTP library (chosen: Playwright `APIRequestContext`).
3. A plan was saved as a markdown artifact and approved by the user.
4. Implementation proceeded one layer at a time: config, base client, resource clients, models, schemas, tests, docs.

## Representative prompts
- "Create a framework and add tests; here is the homework brief (image)."
- "Generate a layered structure for an API testing framework in Playwright."
- "Write 9 tests against JSONPlaceholder: 3 GET, 3 POST, 3 PUT, including negative cases."
- "Validate responses against a JSON Schema using Ajv."
- "Document the framework layers in a Word-friendly markdown file."

## What the AI contributed
- Project skeleton (`package.json`, `playwright.config.js`, `.gitignore`, `.env.example`).
- Layered source code (`BaseApiClient`, `PostsClient`, `UsersClient`, `PostModel`, fixtures, schema validator, logger).
- JSON Schemas for `Post` and post list.
- 9 test specs with positive, partial-update, and negative scenarios.
- README, framework-layers document, and this AI usage report.

## What was reviewed or adjusted manually
- Final endpoint choices and expected status codes (for example, that JSONPlaceholder returns `500` for `PUT` on a non-existent post, and `404` for `GET` on a non-existent post).
- The boundary `POST` case that documents the API's permissive echo behaviour.
- Decision to keep the framework dependency-light (only `@playwright/test`, `ajv`, `ajv-formats`, `dotenv`).
- Wording and structure of the layers document.

## What was rejected or not used
- Heavier reporters such as Allure: discarded to avoid extra setup; Playwright's HTML reporter is sufficient for the homework.
- Adding authentication scaffolding: JSONPlaceholder does not require it, so it was left as a documented extension point.

## Validation
- Code was reviewed by the user before committing.
- Tests are expected to be executed locally with `npm test` and the HTML report inspected with `npm run report`.
- Any failure caused by upstream API changes (JSONPlaceholder) is documented in the test description so the assertion can be revisited.
