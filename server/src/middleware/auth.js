const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/ApiError');

function readToken(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

/** Requires a valid JWT. Sets req.user = { id, email }. */
function requireAuth(req, _res, next) {
  const token = readToken(req);
  if (!token) return next(new ApiError(401, 'Authentication required. Please log in.'));
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Invalid token.';
    next(new ApiError(401, message));
  }
}

/** Attaches req.user when a valid token is present, never fails. */
function optionalAuth(req, _res, next) {
  const token = readToken(req);
  if (token) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      req.user = { id: payload.sub, email: payload.email };
    } catch (_) {
      /* ignore invalid token for public routes */
    }
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
