export const errorHandler = (err , req , res , next) => {
    const statusCode = err.statusCode || 500 ;

    // Log the full stack trace to your terminal logs for local debugging
  console.error(`[ERROR] ${req.method} ${req.url} - Status: ${statusCode}`);
  console.error(err.stack);

  // Send a clean, unified JSON structure back to the frontend
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    status: statusCode
  });
};