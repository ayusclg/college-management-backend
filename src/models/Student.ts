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
  level: number,
  photo?: string,
  isModified:(field:string)=>boolean
  
}



const studentSchema = new mongoose.Schema({
  authOid: {
    type:String,
    required:false
  },
  fullname: {
    type: String,
    require:true,
  },
  fatherName: {
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
  motherName: {
    type: String,
    require:true,
  },
  fatherContact: {
    type: Number,
    require:true,
  },
  studentContact: {
    type: Number,
    require:true
  },
  email: {
    type: String,
    require:true,
    
  },
  password: {
    type: String,
    require:true
  }
}, { timestamps: true })




studentSchema.pre<StudentDocument>("save", async function(this:StudentDocument,next){
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const Student = mongoose.model<StudentDocument>("Student", studentSchema)
