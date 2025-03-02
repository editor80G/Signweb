//import jwt from 'jsonwebtoken';
import jsonwebtoken from '../lib/jsonwebtoken.js'; //own library to promisify jwt

import {
  AUTH_COOKIE_NAME,
  JWT_SECRET,
} from "../config.js";

export const auth = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  // if (!token) {
  //   res.locals.user = null;
  //   return next();
  // }
  if (!token) {
    console.log('No token found');
    res.locals.user = null;
    req.user = null;
    return next();
  }

  try {
    //const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log('Verifying token...'); // debuging statement
    const decodedToken = await jsonwebtoken.verify(token, JWT_SECRET); // must be async but jwt.verify is not async
    console.log('Token verified:', decodedToken); // debuging statement
    req.user = decodedToken; // attach user to request
    res.locals.user = decodedToken; // attach user to handlebars context
    next();
    // } catch {
    //   res.clearCookie(AUTH_COOKIE_NAME);
    //   res.locals.user = null;
    //   return res.redirect('/auth/login');
    // }
  } catch (error) {
    console.error('Token verification failed:', error);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.locals.user = null;
    req.user = null;
    return res.redirect('/auth/login');
  }

};

// Middleware to check if the user is authenticated
export const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  next();
};

// Middleware to check if the user is a guest (not authenticated)
export function isGuest(req, res, next) {
  if (req.user) {
    res.setErorr('You are already authenticated');
    return res.redirect('/');
  }
  next();
}

// Middleware to check if the user is the owner of the resource
export function isOwner(req, res, next) {
  if (!req.data || req.data.owner.toString() !== req.user._id.toString()) {
    return res.redirect('/');
  }
  next();
}
