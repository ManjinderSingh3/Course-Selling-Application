const jwt = require('jsonwebtoken');
const ADMIN_JWT_SECRET = 'Admin';
const USER_JWT_SECRET = 'User';

const authenticateAdminJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, ADMIN_JWT_SECRET, (err, decryptedValue) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = decryptedValue;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateUserJWT = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(' ')[1];
    jwt.verify(token, USER_JWT_SECRET, (err, decryptedValue) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decryptedValue;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  authenticateAdminJWT,
  ADMIN_JWT_SECRET,
  authenticateUserJWT,
  USER_JWT_SECRET,
};
