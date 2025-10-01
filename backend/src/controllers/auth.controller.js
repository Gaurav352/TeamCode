import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../lib/generateOtp.js";

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {

            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//to-do later
export const sendOtp = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

export const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const user = User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        if(user.isVerified){
            return res.status(200).json({message:'Otp already verified'});
        }
        if (!user.otpHash || !user.otpExpiresAt || new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: 'OTP expired or not generated' });
        }
        if (user.otpAttempts >= 5) {
            return res.status(400).json({ message: 'Maximum attempts exceeded' });
        }
        const match = await bcrypt.compare(otp, user.otpHash);
        user.otpAttempts += 1;
        if (match) {
            user.otpHash = undefined;
            user.otpAttempts = 0;
            user.otpExpiresAt = undefined;
            user.isVerified = true;
            await user.save();
            return res.json({ message: 'OTP verified successfully' });
        }
        await user.save();
        res.status(400).json({ message: 'Otp verification failed' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt"); 
        return res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const me = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};