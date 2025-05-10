import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

// Define interface for user document
interface IUser extends Document {
  authOid?: string;
  fullname?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  address?: string;
  isModified: (field: string) => boolean;
}

const userSchema = new Schema<IUser>({
  authOid: String,
  fullname: String,
  email: String,
  password: String,
  profilePicture: String,
  address: String,
});


userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password!, 10);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error as any);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
