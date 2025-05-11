import { Router } from "express";
import { StudentReg } from "../controllers/student";


const router = Router()

router.route("/register").post(StudentReg)
export default router