import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(this.password || "", salt);
  this.password = hash;
  this.location = null;
});

const User = mongoose.model("User", userSchema);

export default User;
