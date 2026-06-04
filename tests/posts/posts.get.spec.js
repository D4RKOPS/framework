const { test, expect } = require('@playwright/test');
const PostsClient = require('../../src/clients/PostsClient');
const { validateSchema } = require('../../src/utils/schemaValidator');
const postSchema = require('../schemas/post.schema.json');
const postListSchema = require('../schemas/postList.schema.json');
const data = require('../../src/data/testData');

test.describe('GET /posts', () => {
  test('TC-GET-01: should return a non-empty list of posts with valid schema', async ({ request }) => {
    const client = new PostsClient(request);
    const res = await client.getAll();

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(data.totalPostsExpected);

    const { valid, errors } = validateSchema(postListSchema, body);
    expect(valid, JSON.stringify(errors)).toBe(true);
  });

  test('TC-GET-02: should return post by id with all required fields', async ({ request }) => {
    const client = new PostsClient(request);
    const res = await client.getById(data.existingPostId);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(data.existingPostId);
    expect(body.userId).toBeDefined();
    expect(body.title).toEqual(expect.any(String));
    expect(body.body).toEqual(expect.any(String));

    const { valid, errors } = validateSchema(postSchema, body);
    expect(valid, JSON.stringify(errors)).toBe(true);
  });

  test('TC-GET-03: should return 404 for a non-existent post id', async ({ request }) => {
    const client = new PostsClient(request);
    const res = await client.getById(data.nonExistentPostId);

    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toEqual({});
  });
});
