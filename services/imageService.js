import supabase from "../utils/supabase.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (files) => {
    try {
        const uploadedFiles = [];

        for (const file of files) {
            const fileName = `student-${Date.now()}-${file.originalname}`;

            const { data, error } = await supabase.storage
                .from('DentaLink')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype
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