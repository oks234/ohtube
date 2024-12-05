import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { email, username, password, name, location } = req.body;
  await User.create({ email, username, password, name, location });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("Remove user");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See user");
