import { Router } from "express";
import { userReg } from "../controllers/userController";


const router = Router()

router.route("/register").post(userReg)
export default router