const verifyUserAuth = (req, res, next) => {
  if (!req.headers.key) {
    return res.status(401).json({
      success: false,
      error: "You need to be authenticated to access this route",
    });
  }
  req.key = req.headers.key;
  return next();
};

module.exports = verifyUserAuth;
