import Tool from "../../models/toolSchema.js";

export const deleteToolById = async (studentId, toolId) => {
    try {
        const tool = await Tool.findOne({ _id: toolId, createdBy: studentId });
        if (!tool) throw new Error("Tool not found or not authorized");
        await Tool.findByIdAndDelete(toolId);
        return { message: "Tool deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};