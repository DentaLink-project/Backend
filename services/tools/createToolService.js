import Tool from "../../models/toolSchema.js";
import { uploadImage } from "../imageService.js";

export const createToolService = async ({ toolName, price, description, category, image, reviews, createdBy }) => {
    try {
        if (!image) {
            throw new Error("Image is required");
        }

        const uploadedImageUrl = await uploadImage(image);

        const tool = await Tool.create({ 
            toolName, 
            price, 
            description, 
            category, 
            images: [uploadedImageUrl], 
            reviews, 
            createdBy 
        });
        
        return tool;
    }
    catch (error) {
        throw new Error(`Error adding tool: ${error.message}`);
    }
}