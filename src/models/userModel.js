import bcrypt from "bcrypt";

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  authOid: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  address: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
