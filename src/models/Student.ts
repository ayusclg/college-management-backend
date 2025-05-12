import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { Document } from "mongodb";


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
  }
}, { timestamps: true })




studentSchema.pre<StudentDocument>("save", async function(this:StudentDocument,next){
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const Student = mongoose.model<StudentDocument>("Student", studentSchema)
