import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = !!req.session.loggedIn;
  res.locals.siteName = "Ohtube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  next();
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  return next();
};

export const uploadFiles = multer({ dest: "uploads/" });
