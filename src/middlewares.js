import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: "ohtube-2024",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`);
  },
});

const s3VideoStorage = multerS3({
  s3: s3Client,
  bucket: "ohtube-2024",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `videos/${req.session.user._id}/${Date.now().toString()}`);
  },
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = !!req.session.loggedIn;
  res.locals.siteName = "Ohtube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
  return next();
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
  return next();
};

export const avatarUpload = multer({
  limits: { fileSize: 3 * 1000 * 1000 },
  storage: s3AvatarStorage,
});

export const videoUpload = multer({
  limits: { fileSize: 10 * 1000 * 1000 },
  storage: s3VideoStorage,
});
