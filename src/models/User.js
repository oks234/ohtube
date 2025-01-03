import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, default: "" },
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password || "", salt);
    this.password = hash;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
