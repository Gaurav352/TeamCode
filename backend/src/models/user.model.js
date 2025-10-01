import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String,default:'' },
    isVerified: { type: Boolean ,default:false},
    otpHash: { type: String,default:'' },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });
const User = mongoose.model("user", userSchema);
export default User;