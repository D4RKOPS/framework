/**
 * Factory/builder for Post payloads.
 */
class PostModel {
  constructor({ title, body, userId } = {}) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  static valid(overrides = {}) {
    return new PostModel({
      title: 'Automated test title',
      body: 'Automated test body content',
      userId: 1,
      ...overrides,
    });
  }

  static minimal() {
    return new PostModel({ title: 't', body: 'b', userId: 1 });
  }

  toJSON() {
    return { title: this.title, body: this.body, userId: this.userId };
  }
}

module.exports = PostModel;
