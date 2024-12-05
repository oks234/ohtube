import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("User", this.password);
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(this.password || "", salt);
  this.password = hash;
  console.log("Hashed", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
