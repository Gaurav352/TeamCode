import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const protectRoute=async (req,res,next)=>{
    
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message:"Invalid token"
            });
        }
        const user=await User.findById(decoded.userId).select("-password");
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in auth middleware", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}