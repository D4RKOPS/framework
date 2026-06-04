const { test, expect } = require('@playwright/test');
const PostsClient = require('../../src/clients/PostsClient');
const PostModel = require('../../src/models/PostModel');
const { validateSchema } = require('../../src/utils/schemaValidator');
const postSchema = require('../schemas/post.schema.json');

test.describe('POST /posts', () => {
  test('TC-POST-01: should create a post with a valid payload and return 201', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = PostModel.valid().toJSON();
    const res = await client.create(payload);

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body.id).toBeDefined();

    const { valid, errors } = validateSchema(postSchema, body);
    expect(valid, JSON.stringify(errors)).toBe(true);
  });

  test('TC-POST-02: should create a post with the minimal payload', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = PostModel.minimal().toJSON();
    const res = await client.create(payload);

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(payload.title);
    expect(body.id).toEqual(expect.any(Number));
  });

  test('TC-POST-03: should accept request and echo unusual userId type (boundary case)', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = { title: 'edge', body: 'edge case', userId: 'not-a-number' };
    const res = await client.create(payload);

    // JSONPlaceholder is permissive: it echoes payload and assigns an id.
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.userId).toBe('not-a-number');
    expect(body.id).toBeDefined();
  });
});
