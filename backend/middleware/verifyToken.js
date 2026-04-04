const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authenticated!' });
  jwt.verify(token, process.env.JWT_SECRET || 'luminous_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid!' });
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'You are not authorized! Admin only.' });
  }
};

module.exports = { verifyToken, verifyAdmin };
