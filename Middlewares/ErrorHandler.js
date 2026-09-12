class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong on the server';

  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = { errorHandler, AppError };