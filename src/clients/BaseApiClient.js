const logger = require('../utils/logger');

/**
 * Base API client that wraps Playwright's APIRequestContext.
 * Centralizes logging, error handling, and JSON parsing for all resource clients.
 */
class BaseApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} [basePath]
   */
  constructor(request, basePath = '') {
    this.request = request;
    this.basePath = basePath;
  }

  _url(path) {
    return `${this.basePath}${path}`;
  }

  async get(path, options = {}) {
    logger.info('GET', this._url(path));
    return this.request.get(this._url(path), options);
  }

  async post(path, data, options = {}) {
    logger.info('POST', this._url(path));
    return this.request.post(this._url(path), { data, ...options });
  }

  async put(path, data, options = {}) {
    logger.info('PUT', this._url(path));
    return this.request.put(this._url(path), { data, ...options });
  }

  async delete(path, options = {}) {
    logger.info('DELETE', this._url(path));
    return this.request.delete(this._url(path), options);
  }
}

module.exports = BaseApiClient;
