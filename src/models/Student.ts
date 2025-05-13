import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { Document } from "mongodb";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Types } from "joi";

configDotenv()
interface StudentDocument extends Document{
  authOid: string,
  address?: string,
  fullname: string,
  fatherName: string,
  motherName: string,
  fatherContact: number,
  level: string,
  photo?: string,
  isModified: (field: string) => boolean
  enum:string
  isPasswordCorrect:(field:string)=>boolean
}



const studentSchema = new mongoose.Schema({
  authOid: {
    type:String,
    required:false
  },
  fullname: {
    type: String,
    
  },
  fatherName: {
    type: String,
   
  },
  address: {
    type: String,
    
  },
  photo: {
    type:String
  },
  motherName: {
    type: String,
   
  },
  fatherContact: {
    type: Number,
    
  },
  studentContact: {
    type: Number,
    
  },
  email: {
    type: String,
    
    
  },
  password: {
    type: String,
    
  },
  gender: {
    type:String,
    enum:["male","female"]
  },
  level: {
    type: String,
    default:"+2"
  },
  refresh_token: {
    type:String
  }
}, { timestamps: true })




studentSchema.methods.generateAccessToken = function (): string {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRY) {
    throw new Error("ACCESS_TOKEN_SECRET or EXPIRY not set");
  }

  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};


studentSchema.methods.generateRefreshToken = function (): string {
  if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRY) {
    throw new Error("REFRESH_TOKEN_SECRET or EXPIRY not set");
  }

  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


export const Student = mongoose.model<StudentDocument>("Student", studentSchema)
