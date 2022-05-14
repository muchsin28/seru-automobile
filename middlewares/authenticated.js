const jwt = require('jsonwebtoken');

const authenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticated;
