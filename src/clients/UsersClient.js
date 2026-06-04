const BaseApiClient = require('./BaseApiClient');

class UsersClient extends BaseApiClient {
  constructor(request) {
    super(request, '/users');
  }

  getAll() {
    return this.get('');
  }

  getById(id) {
    return this.get(`/${id}`);
  }
}

module.exports = UsersClient;
