const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`;

    if (res.statusCode >= 400) {
      console.error(logLine);
    } else {
      console.log(logLine);
    }
  });

  next();
};

module.exports = logger;