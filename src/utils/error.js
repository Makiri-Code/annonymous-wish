module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.error = err.error || true;
  res.status(err.statusCode).json({
    error: err.error,
    message: err.message || "something went wrong",
    stack: err.stack,
  });
};
