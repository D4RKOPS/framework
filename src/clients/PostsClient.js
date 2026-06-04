const BaseApiClient = require('./BaseApiClient');

class PostsClient extends BaseApiClient {
  constructor(request) {
    super(request, '/posts');
  }

  getAll() {
    return this.get('');
  }

  getById(id) {
    return this.get(`/${id}`);
  }

  create(post) {
    return this.post('', post);
  }

  update(id, post) {
    return this.put(`/${id}`, post);
  }

  remove(id) {
    return this.delete(`/${id}`);
  }
}

module.exports = PostsClient;
