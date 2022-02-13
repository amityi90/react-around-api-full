const switchErrToNum = (err) => {
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

module.exports.throwErrWhenFail = (err) => {
  err = new Error("could not find");
  error.statusCode = 404;
  console.log(`-----err: ${err} -----`);
  return err;
}

module.exports.handleErrors = (err, req, res, next) => {
  err.statusCode = switchErrToNum(err);
  const { statusCode, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
  next();
}