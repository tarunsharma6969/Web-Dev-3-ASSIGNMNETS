module.exports = (req, res, next) => {
  const stamp = new Date().toLocaleTimeString();
  console.log(`${stamp} | ${req.method} ${req.originalUrl}`);
  next();
};
