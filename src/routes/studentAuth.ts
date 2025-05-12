import { Router } from "express";
import { studentCreate } from "../controllers/studentAuth";
import { validate } from "../middlewares/validation";

const router = Router()

router.route("/authO").post(studentCreate)

export default router