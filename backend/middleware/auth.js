const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    req.userRole = decoded.role;  // Add role to req for checks
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;