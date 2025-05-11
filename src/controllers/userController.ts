import { Request,Response } from "express"
import { User } from "../models/userModel"
import { uploadImage } from "../utils/fileUpload"

const userReg = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, fullname, password, address, picture } = req.body
        
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

        const photoUrl = req.file as Express.Multer.File
        const uploadUrl = await uploadImage(photoUrl)
        if (!uploadUrl) {
            res.status(500).json({
                message:"SERVER ERROR IN UPDATING IMAGE"
            })
        }

        const createUser = new User({
            email,
            password,
            fullname,
            address,
            picture:uploadUrl
        })
        await createUser.save()
        
        res.status(201).json({
            message: "User Created",
            data:createUser.select("-password")
        })
    } catch (error) {
        res.status(500).json({message:"Server Error In User Register"})
    }
}

export {userReg}