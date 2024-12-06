import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(this.password || "", salt);
  this.password = hash;
  this.location = null;
});

const User = mongoose.model("User", userSchema);

export default User;
