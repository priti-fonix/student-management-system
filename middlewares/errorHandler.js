function errorHandler(err, req, res, next) {
  try {
    console.log(`${req.method} - ${req.url} at ${Date().now.tostring()} ;`);
    return next();
  } catch (err) {
    console.log(`error occured`);

    return res.status(400).json({
      message: `${err.message} , bad request  to ${req.method}`,
      success: false,
    });
  }
}
module.exports = errorHandler;
