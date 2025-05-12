import { Router } from "express";
import { studentCreate } from "../controllers/studentAuth";

const router = Router()

router.route("/auth").post(studentCreate)

export default router