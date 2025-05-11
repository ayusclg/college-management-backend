import { Request,Response } from "express"
import { User } from "../models/userModel"
import { uploadImage } from "../utils/fileUpload"

const userReg = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { email, fullname, password, address } = req.body
        
        
        if (!email || !fullname || !password || !address) {
            res.status(403).json({
                message: "Error Occured  in fetching details"
            })
            return
        }
        const user = await User.findOne({
            email,
        })
        if (user) {
            res.status(403).json({
                message:"User Already Exist"
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
        
        
        const createUser = await User.create({
            email: email,
            password: password,
            fullname: fullname,
            address: address,
            photo:uploadUrl || "Not Uploaded"
        })
        
        
        const created = await User.findById(createUser._id).select("-password")
        
        res.status(201).json({
            message: "User Created",
            data:created
        })
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error In User Register" })
        return
    }
}

export {userReg}