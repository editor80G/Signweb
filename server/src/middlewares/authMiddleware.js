import jsonwebtoken from '../lib/jsonwebtoken.js'; //own library to promisify jwt
import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js";
import { isTokenBlacklisted } from '../utils/authUtils.js';

export const auth = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    res.locals.user = null;
    req.user = null;
    return next();
  }
  try {
    const decodedToken = await jsonwebtoken.verify(token, JWT_SECRET); // must be async but jwt.verify is not async
    req.user = decodedToken; // attach user to request
    res.locals.user = decodedToken; // attach user to response locals
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.locals.user = null;
    req.user = null;
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if the user is authenticated
export const isAuth = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(401).json({ error: 'Cookies are not defined' });
  }
  const token = req.cookies[AUTH_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: 'You are not authenticated! No token' });
  }
  if (!req.user || isTokenBlacklisted(token)) {
    return res.status(401).json({ error: `You are not authenticated! Is token blacklisted: ${isTokenBlacklisted(token)} User: ${req.user}` });
  }
  next();
};

// Middleware to check if the user is a guest (not authenticated)
export function isGuest(req, res, next) {
  if (req.user) {
    return res.status(403).json({ error: 'You are already authenticated' });
  }
  next();
}

// Middleware to check if the user is the owner of the resource
export function isOwner(req, res, next) {
  if (!req.data || req.data.owner.toString() !== req.user._id.toString()) {
    //return res.redirect('/');
    return res.status(403).json({ error: 'You are not the owner of this resource' });
  }
  next();
}
