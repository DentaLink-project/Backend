import { uploadImage } from './imageService.js';
import Tool from '../models/toolSchema.js';


export const addToolService = async ({ toolName, price, description, category, images ,createdBy }) => {
    try {
        if (!images || images.length === 0) {
            throw new Error("At least one image is required");
        }

        const uploadedImageUrls = await uploadImage(images);
        if (!uploadedImageUrls || uploadedImageUrls.length === 0) {
            throw new Error("Image upload failed");
        }
        

        const newTool = await Tool.create({
            toolName,
            price,
            description,
            category,
            images: uploadedImageUrls,
            addedBy:createdBy

        });

        return newTool;
    } catch (error) {
        throw new Error(`Error adding tool: ${error.message}`);
    }
};
