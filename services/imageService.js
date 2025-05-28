import supabase from "../utils/supabase.js";
import multer from "multer";
import sharp from "sharp";

// Configure multer with file size limit (5MB)
const storage = multer.memoryStorage();
export const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB in bytes
    }
});

// Function to compress image
const compressImage = async (buffer) => {
    try {
        const compressedBuffer = await sharp(buffer)
            .resize(800, 800, { // Resize to max dimensions while maintaining aspect ratio
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();
        return compressedBuffer;
    } catch (error) {
        throw new Error(`Image compression failed: ${error.message}`);
    }
};

export const uploadImage = async (files) => {
    try {
        const uploadedFiles = [];

        for (const file of files) {
            const compressedBuffer = await compressImage(file.buffer);
            
            const fileName = `student-${Date.now()}-${file.originalname}`;

            const { data, error } = await supabase.storage
                .from('DentaLink')
                .upload(fileName, compressedBuffer, {
                    contentType: 'image/jpeg'
                });
            if (error) throw new Error(error.message);

            const { data: urlData } = supabase.storage
                .from('DentaLink')
                .getPublicUrl(data.path)
  
            uploadedFiles.push(urlData.publicUrl);
        }
        return uploadedFiles;
    }
    catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
}