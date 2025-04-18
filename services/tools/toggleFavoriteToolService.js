import Student from "../../models/studentSchema.js";

export const toggleFavouriteToolService = async (studentId, toolId) => {
    try {
        const foundStudent = await Student.findById(studentId);
        if (!foundStudent) {
            throw new Error("Student not found");
        }

        if (foundStudent.favoriteTools.includes(toolId)) {
            foundStudent.favoriteTools = foundStudent.favoriteTools.filter(
                (favId) => favId.toString() !== toolId
            );
            await foundStudent.save();

            return "Tool removed from favorites";
        } else {
            foundStudent.favoriteTools.push(toolId);
            await foundStudent.save();

            return "Tool added to favorites";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};