import Project from "../models/project.model.js";

export const isProjectMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());
        const isOwner = project.owner.toString() === userId.toString();
        if (!isMember && !isOwner) {
            return res.status(403).json({ message: 'Access denied. You are not part of this project.' });
        }
        req.project=project;
        next();
    } catch (error) {

    }
}