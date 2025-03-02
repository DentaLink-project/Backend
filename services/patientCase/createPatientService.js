import Patient from "../../models/patientCaseSchema.js";
import { uploadImage } from "../imageService.js";

export const createPatientService = async ({ name, title, age, gender, phone, category, description, location, images, createdBy }) => {
    try {
        if (!images || images.length === 0) {
            throw new Error("At least one image is required");
        }

        const uploadedImageUrls = await uploadImage(images);

        const patient = await Patient.create({
            name,
            age: parseInt(age),
            gender,
            phone,
            title,
            category,
            description,
            location,
            images: uploadedImageUrls, 
            createdBy
        });

        return patient;
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`);
    }
};
