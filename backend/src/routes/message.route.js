import Router from "express";
import { getAllMessages } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router=Router();
router.post("/getAllMessages/:projectId",protectRoute,getAllMessages);
