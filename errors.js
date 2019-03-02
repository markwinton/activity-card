class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

class ResourceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceError';
  }
}

module.exports = {
  AuthorizationError,
  ResourceError,
};
