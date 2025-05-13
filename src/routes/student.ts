import { Router } from "express";
import { studentLogin, StudentReg } from "../controllers/student";
import { validate } from "../middlewares/validation";


const router = Router()

router.route("/register").post(validate, StudentReg)
router.route("/login").get(studentLogin)
export default router