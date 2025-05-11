import mongoose from "mongoose";


interface user extends Document{
  authOid: string,
  email: string,
  password: string,
  address?: string,
  fullname: string
  isModified:(field:string)=>Boolean
  
}



const userSchema = new mongoose.Schema({
  authOid: {
    type: String,
    required:true
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
  picture: {
    type:String
  },
  password: {
    type:String,
  }
}, { timestamps: true })




export const User = mongoose.model<user>("User",userSchema)