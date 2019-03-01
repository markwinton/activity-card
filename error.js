class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class DatabaseError extends CustomError {}
class NetworkError extends CustomError {}
class AuthorizationError extends CustomError {}
class ResourceError extends CustomError {}

module.exports = {
  DatabaseError,
  NetworkError,
  AuthorizationError,
  ResourceError,
};
