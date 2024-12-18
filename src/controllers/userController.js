import bcrypt from "bcrypt";
import User from "../models/User";

const PASSWORD_CONFIRMATION_ERR_MSG = "Password confirmation does not match.";

export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const path = "users/join";
  const pageTitle = "Join";
  const { email, password, passwordConfirmation, name, location } = req.body;
  const exists = await User.exists({ email });
  if (exists) {
    req.flash("error", "The email is already exists.");
    return res.status(400).render(path, { pageTitle });
  }
  if (password !== passwordConfirmation) {
    req.flash("error", PASSWORD_CONFIRMATION_ERR_MSG);
    return res.status(400).render(path, { pageTitle });
  }
  try {
    await User.create({ email, password, name, location });
    req.flash("success", "User created.");
    return res.redirect("/login");
  } catch (error) {
    req.flash("error", error._message);
    return res.status(400).render(path, { pageTitle });
  }
};
export const getEdit = (req, res) =>
  res.render("users/edit-profile", { pageTitle: "Edit Profile" });
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, name, location },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl,
      name,
      email,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
export const remove = (req, res) => res.send("Remove user");
export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "An account with this email does not exits.",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user,user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      req.flash("error", "There's no valid email address.");
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        avatarUrl: userData.avatar_url,
        password: "",
        socialOnly: true,
        name: userData.name,
        location: userData.location || "",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
  } else {
    req.flash("error", "Access token is wrong.");
    return res.redirect("/login");
  }
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Social login user can't change password.");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const path = "users/change-password";
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, password, passwordConfirmation },
  } = req;
  if (password !== passwordConfirmation) {
    req.flash("error", PASSWORD_CONFIRMATION_ERR_MSG);
    return res.status(400).render(path, { pageTitle });
  }
  const user = await User.findById(_id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    req.flash("error", "The Current password is incorrect.");
    return res.status(400).render(path, { pageTitle });
  }
  user.password = password;
  await user.save();
  return res.redirect("/users/logout");
};
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  return res.render("users/profile", {
    pageTitle: "User Profile",
    user,
  });
};
