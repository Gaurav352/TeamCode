import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireVerified } from "../middlewares/verified.middleware.js";
import { createProject, deleteProject, getProject } from "../controllers/project.controller.js";
import { isProjectMember } from "../middlewares/isProjectMember.js";


const router = Router();
router.post("/createProject",protectRoute,requireVerified,createProject);
router.post("/getProject/:projectId",protectRoute,isProjectMember,getProject);
router.post("/deleteProject",protectRoute,requireVerified,deleteProject);