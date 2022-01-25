module.exports.switchErrToNum = (err) => {
  switch (err.name) {
    case "CastError":
      return 404;
      break;
    case "ValidationError":
      return 400;
      break;
    default:
      return 500;
  }
}

module.exports.throwErrWhenFail = () => {
  const error = new Error("No card found with that id");
  error.statusCode = 404;
  throw error;
}