import { Router } from "express";
import { StudentReg } from "../controllers/student";
import { validate } from "../middlewares/validation";


const router = Router()

router.route("/register").post(validate,StudentReg)
export default router