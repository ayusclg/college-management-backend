import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { Document } from "mongodb";


interface UserDocument extends Document{
  authOid: string,
  email: string,
  password: string,
  address?: string,
  fullname: string
  photo?:string
  isModified:(field:string)=>boolean
  
}



const userSchema = new mongoose.Schema({
  authOid: {
    type:String,
    required:false
  },
  fullname: {
    type: String,
    require:true,
  },
  email: {
    type: String,
    require:true,
  },
  address: {
    type: String,
    require:true,
  },
  photo: {
    type:String
  },
  password: {
    type:String,
  }
}, { timestamps: true })




userSchema.pre<UserDocument>("save", async function(this:UserDocument,next){
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const User = mongoose.model<UserDocument>("User", userSchema)
