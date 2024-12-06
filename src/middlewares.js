export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = !!req.session.loggedIn;
  res.locals.siteName = "Ohtube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
