import Tool from "../../models/toolSchema.js";
import Student from "../../models/studentSchema.js";

export const fetchToolByIdService = async (id, studentId) => {
    try {
        const foundTool = await Tool.findById(id).populate("createdBy", "name email -role");

        if (!foundTool) {
            throw new Error("Tool not found");
        }
        const foundStudent = await Student.findById(studentId);
        const isFavoriteTool = foundStudent.favoriteTools.some(fav => fav.toString() === foundTool._id.toString());

        return { ...foundTool._doc, isFavoriteTool };
    } catch (error) {
        throw new Error(error.message);
    }
};