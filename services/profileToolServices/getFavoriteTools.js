import Student from "../../models/studentSchema.js";

export const getFavoriteTools = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate({
            path: "favoriteTools",
            populate: { path: "createdBy", select: "name email -role" }
        });
        if (!student) throw new Error("Student not found");
        return student.favoriteTools.map(tool => ({
            ...tool.toObject(),
            isFavTool: true
        }));
    } catch (error) {
        throw new Error(error.message);
    }
};