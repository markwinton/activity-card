class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class AuthorizationError extends CustomError {}
class ResourceError extends CustomError {}

module.exports = {
  AuthorizationError,
  ResourceError,
};
