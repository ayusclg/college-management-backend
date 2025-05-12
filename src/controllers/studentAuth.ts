import { Request,Response } from "express"
import { Student } from "../models/Student"
const studentCreate = async (req: Request, res: Response):Promise<void> => {
try {
    const { authOid } = req.body
    
    const userExist = await Student.findOne({ authOid, })
    if (userExist) {
        res.status(403).json({
            message:"Access Forbidden User Already Exist"
        })
        return
    }
    
    
    const createUser = new Student(req.body)
    await createUser.save()
    res.status(201).json({
        message: "User Registered",
        data:createUser
    })
} catch (error) {
    res.status(500).json({
        message:"Sever Error In Student Create"
    })
}
}

export{studentCreate}