import express from "expresss";
import { getUserProfile, updateUserProfile } from "../controller/user.controller";
import { verifyToken } from "../middleware/auth.middleware.js";



const router = express.Router();


router.get("/profile/:userName",getUserProfile);
router.put("/update",verifyToken ,updateUserProfile)

export default router;
