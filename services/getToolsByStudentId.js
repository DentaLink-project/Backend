import Tool from "../models/toolSchema.js";
export const getToolsByStudentId = async (studentId) => {
    try {
        const tools = await Tool.find({ addedBy: studentId }); 
        return tools;
    } catch (err) {
        console.error('Error in getToolsByStudentId:', err);
        throw new Error('Failed to fetch tools');
    }
};



