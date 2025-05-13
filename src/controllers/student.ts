import { Request,Response } from "express"
import { Student } from "../models/Student"
import { uploadImage } from "../utils/fileUpload"
import { error } from "console"
import { ObjectId } from "mongoose"
import { Types } from "mongoose"

declare global{
    namespace express{
        interface Request {
        authOid: String,
        userId: String
    }
}
}

const AccessToken = async (userId: Types.ObjectId):Promise<string>=>{
    try {
        const user = await Student.findById(userId)
        if (!user) {
        throw new Error('User not found');
      }
        const AccessToken: string = await user.generateAccessToken()
        
        return AccessToken;

    } catch (error) {
        console.log("Error In Generating AccessToken")
    }

}

const RefreshToken = async (userId:Types.ObjectId):Promise<string> =>{
    try {
        const user = await Student.findById(userId)
        if (!user) {
            throw new Error("user not found")
        }
        const RefreshToken = await user.generateRefreshToken() as string
        user.refresh_token = RefreshToken
        await user.save({
            validateBeforeSave:false
        })
        return RefreshToken
    } catch (error) {
        console.log("Error In Generating RefreshToken")
    }
}

const StudentReg = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { email, fullname, password, address, fatherContact, fatherName, motherName, studentContact, gender,level } = req.body
        
        
        if (!email || !fullname || !password || !address ||!fatherContact ||!fatherName ||!motherName ||!studentContact) {
            res.status(403).json({
                message: "Error Occured  in fetching details"
            })
            return
        }
        const exist = await Student.findOne({
            email,
        })
        if (exist) {
            res.status(403).json({
                message:"Student Already Exist"
            })
            return;
        }
        let uploadUrl:string | undefined = undefined 
        if (req.file) {
            const photoUrl = req.file as Express.Multer.File
            uploadUrl = await uploadImage(photoUrl)
            if (!uploadUrl) {
                res.status(500).json({
                    message: "SERVER ERROR IN UPDATING IMAGE"
                })
                return
            }
        }
        
        
        const createStudent = await Student.create({
            email: email,
            password: password,
            fullname: fullname,
            address: address,
            fatherContact,
            fatherName,
            motherName,
            studentContact,
            photo: uploadUrl || "Not Uploaded",
            gender,
            level,
        })
        
        
        const created = await Student.findById(createStudent._id).select("-password")
        
        res.status(201).json({
            message: "Student Created",
            data:created
        })
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error In Student Register" })
        return
    }
}


const studentLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            res.status(403).json({
                message:"Invalid Credentials "
            })
            return
        }
        const user = await Student.findOne({ email, })
        if (!user)
        {
            res.status(400).json({message:"Email Doesnot Exist"})
            return
        }

        const passwordCheck = await user.isPasswordCorrect(password)
        if (!passwordCheck) {
            res.status(403).json({
                message:"Invalid Credentials"
            })
        }
        const refreshToken = await RefreshToken(user._id)
        const accessToken = await AccessToken(user._id)

        if (!refreshToken || !accessToken) {
            res.status(404).json({
                message:"Token Not Generated"
            })
            return
        }
        const userLoggedIn = await Student.findById(user._id).select("-password -refresh_token")

        const options = {
            httpOnly: true,
            secure:true
        }
        res.status(200)
            .cookie("accessToken", accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json({
            message:"User Logged In",
            data:userLoggedIn
        })
            
    } catch (error) {
        res.status(500).json({message:"Server Error In Student Login"})
    }
}
export {StudentReg,studentLogin}