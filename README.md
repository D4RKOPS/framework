# API Testing Framework

> **GitHub repo:** https://github.com/D4RKOPS/framework.git

API testing framework built with **JavaScript + Playwright Test** that exercises the public **JSONPlaceholder** API (`https://jsonplaceholder.typicode.com`). It contains 9 automated tests (3 GET, 3 POST, 3 PUT) organized in a layered architecture.

## Requirements
- Node.js 18+ and npm.

## Installation
```bash
npm install
```

## Run all tests
```bash
npm test
```

## Run by HTTP method
```bash
npm run test:get
npm run test:post
npm run test:put
```

## View HTML report
After running the suite:
```bash
npm run report
```

## Project structure
```
framework/
├── playwright.config.js
├── src/
│   ├── config/env.js                # Environment configuration
│   ├── clients/
│   │   ├── BaseApiClient.js         # Core HTTP wrapper (Base layer)
│   │   ├── PostsClient.js           # /posts resource client (Service layer)
│   │   └── UsersClient.js           # /users resource client
│   ├── models/PostModel.js          # Payload builder (Model layer)
│   ├── data/testData.js             # Fixtures and constants (Data layer)
│   └── utils/
│       ├── logger.js
│       └── schemaValidator.js       # Ajv JSON Schema validation
├── tests/
│   ├── posts/
│   │   ├── posts.get.spec.js        # 3 GET tests
│   │   ├── posts.post.spec.js       # 3 POST tests
│   │   └── posts.put.spec.js        # 3 PUT tests
│   └── schemas/                     # JSON Schemas
└── docs/
    ├── framework-layers.md          # Layer description (also exported to .docx)
    └── ia-usage.md                  # AI usage documentation
```

## Test catalogue
| ID | Method | Description |
|---|---|---|
| TC-GET-01 | GET | List all posts, validate schema and count |
| TC-GET-02 | GET | Fetch post by id, validate required fields |
| TC-GET-03 | GET | Non-existent post returns 404 |
| TC-POST-01 | POST | Create post with valid payload returns 201 |
| TC-POST-02 | POST | Create post with minimal payload |
| TC-POST-03 | POST | Boundary: unusual userId type is echoed back |
| TC-PUT-01 | PUT | Full update of existing post |
| TC-PUT-02 | PUT | Partial update (title only) |
| TC-PUT-03 | PUT | Update of non-existent post returns 500 |

## Documentation
- Framework layers description: `docs/framework-layers.md`
- AI usage report: `docs/ia-usage.md`
