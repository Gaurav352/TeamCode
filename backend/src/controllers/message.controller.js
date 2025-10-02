import Message from "../models/message.model.js";

export const getAllMessages = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        if (!projectId) return res.status(400).json({ message: "Project not found" });
        const messages = await Message.find({ project: projectId })
                              .sort({ createdAt: 1 }) 
                              .populate('senderId', 'fullName avatarUrl');
        return res.status(200).json({ message: "Fetched successfully", messages });
    } catch (error) {
        console.log("Error in getAllProjects controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const saveMessage = async (payload) => {
    try {
        const { senderId, projectId, text, file } = payload;
        if (!senderId || !projectId) return { success: false, message: 'Something went wrong' };
        if (!text && !file) return { success: false, message: 'Message cannot be empty' };
        //todo:file handling related stuff:
        const message = new Message({
            senderId,
            projectId,
            text,
            attachment:file
        });
        const saved=await message.save();
        //return to socket listener
        return { success: true, data: saved };
    } catch (error) {
        console.log("Error in getAllProjects controller", error.message);
        return {success:false, message: "Failed to send message, retry" };
    }
}