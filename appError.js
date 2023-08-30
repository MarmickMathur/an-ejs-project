class appError extends Error {
  constructor(status, message = "internal error ") {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = appError;
