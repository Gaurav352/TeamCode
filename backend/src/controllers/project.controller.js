import Project from "../models/project.model";

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { user } = req.user;
        if (!name || !description) {
            return res.status(400).json({ message: 'Please Enter All fields' });
        }
        const project = new Project({
            owner: user._id,
            name,
            description
        });
        await project.save();
        return res.status(200).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        console.log("Error in createProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getProject = async (req, res) => {
    try {
        const project = await req.project
            .populate('owner', 'username email avatarUrl')
            .populate('members', 'username email avatarUrl')
            .populate('files');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Found project', project });
    } catch (error) {
        console.log("Error in getProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.body;
        const user = req.user;
        if (!projectId) return res.status(400).json({ message: "Missing project Id" });
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.owner.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Only project owner can delete this project' });
        }
        await Project.findByIdAndDelete(projectId);
        res.json({ message: 'Project deleted successfully' });


    } catch (error) {
        console.log("Error in deleteProject controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
