import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { login, logout, me, otpVerify, register, sendOtp } from "../controllers/auth.controller.js";

const router = Router();
router.post("/register",register);
router.post("/login",login);
router.post("/otpVerify",protectRoute,otpVerify);
router.post("/logout",protectRoute,logout);
router.post("/me",protectRoute,me);
router.post("/sendOtp",protectRoute,sendOtp);

export default router;