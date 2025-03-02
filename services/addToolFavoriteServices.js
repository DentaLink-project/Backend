import Student from "../models/studentSchema.js";
import Tool from "../models/toolSchema.js";

export const addToolInFavorite = async (studentId, toolId) => {
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error("Student not found");
    }

    if (!student.favorites) {
        student.favorites = [];
    }

    const tool = await Tool.findById(toolId);
    if (!tool) {
        throw new Error("Tool not found");
    }

    if (student.favorites.includes(toolId)) {
        throw new Error("Tool is already in favorites");
    }

    student.favorites.push(toolId);
    await student.save();
    

    return student.favorites;
};
