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

class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

module.exports = {
  AuthorizationError,
  ResourceError,
  InputError,
};
