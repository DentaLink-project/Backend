import Tool from "../models/toolSchema.js";

export const getAllTools = async () => {
    try {
        const tools = await Tool.find(); 
        return tools;
    } catch (err) {
        console.error('Error in getAllTools:', err);
        throw new Error('Failed to fetch tools');
    }
};

export const getToolsByStudentId = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate('tools'); 
        if (!student) {
            throw new Error("Student not found");
        }
        return student.tools;
    } catch (err) {
        console.error('Error in getToolsByStudentId:', err);
        throw new Error('Failed to fetch tools');
    }
};
