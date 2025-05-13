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




studentSchema.pre<StudentDocument>("save", async function(this:StudentDocument,next){
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

studentSchema.methods.isPasswordCorrect = async function(password:string):Promise<Boolean>{
return await bcrypt.compare(password,this.password)
}


studentSchema.methods.generateRefreshToken =  function ():string {
  return jwt.sign({
    _id:this._id
  }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY as string
  })
}

studentSchema.methods.generateAccessToken = function (): string{
  return jwt.sign({
    _id: this._id,
    fullname: this.fullname,
    studentContact:this.studentContact
  },
    process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY as string
  })
}

export const Student = mongoose.model<StudentDocument>("Student", studentSchema)
