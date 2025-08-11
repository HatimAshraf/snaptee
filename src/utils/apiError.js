class apiError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode,
    error = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.statusCode = statusCode;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { apiError };
