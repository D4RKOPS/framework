const { test, expect } = require('@playwright/test');
const PostsClient = require('../../src/clients/PostsClient');
const PostModel = require('../../src/models/PostModel');
const { validateSchema } = require('../../src/utils/schemaValidator');
const postSchema = require('../schemas/post.schema.json');
const data = require('../../src/data/testData');

test.describe('PUT /posts/:id', () => {
  test('TC-PUT-01: should fully update an existing post', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = PostModel.valid({ title: 'Updated title', body: 'Updated body' }).toJSON();
    const res = await client.update(data.existingPostId, payload);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(data.existingPostId);
    expect(body.title).toBe('Updated title');
    expect(body.body).toBe('Updated body');

    const { valid, errors } = validateSchema(postSchema, body);
    expect(valid, JSON.stringify(errors)).toBe(true);
  });

  test('TC-PUT-02: should update only the title field', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = { title: 'Only title changed' };
    const res = await client.update(data.existingPostId, payload);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Only title changed');
    expect(body.id).toBe(data.existingPostId);
  });

  test('TC-PUT-03: should return 500 when updating a non-existent post', async ({ request }) => {
    const client = new PostsClient(request);
    const payload = PostModel.valid().toJSON();
    const res = await client.update(data.nonExistentPostId, payload);

    // JSONPlaceholder returns 500 for PUT on a non-existent resource.
    expect(res.status()).toBe(500);
  });
});
