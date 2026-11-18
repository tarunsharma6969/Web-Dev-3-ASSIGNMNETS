function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `No API route for ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((item) => item.message).join(", ");
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid inventory item ID";
  } else if (err.code === 11000) {
    status = 409;
    message = "That SKU is already in use";
  } else if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Request body must contain valid JSON";
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(`[${status}] ${req.method} ${req.originalUrl}: ${message}`);
  }

  res.status(status).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
