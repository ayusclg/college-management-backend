import { Request,Response } from "express"
import { Student } from "../models/Student"
import { uploadImage } from "../utils/fileUpload"

declare global{
    namespace express{
        interface Request {
        authOid: String,
        userId: String
    }
}
}

const StudentReg = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { email, fullname, password, address,fatherContact,fatherName,motherName,studentContact, } = req.body
        
        
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
            photo:uploadUrl || "Not Uploaded"
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


export {StudentReg}