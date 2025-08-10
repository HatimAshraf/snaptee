class aipError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode,
    error = [],
    stack = ""
  ) {
    super(message);
  }
}
