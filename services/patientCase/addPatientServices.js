import Patient from "../../models/patientCaseSchema.js";
import { uploadImage } from "../imageService.js";

export const addPatient = async ({ name, title, age, gender, phone, category, description, location, files, createdBy }) => {
    try {
        if (!files || files.length === 0) {
            throw new Error("At least one image is required");
        }

        const imageUrls = await uploadImage(files);

        const patient = await Patient.create({
            name,
            age: parseInt(age),
            gender,
            phone,
            title,
            category,
            description,
            location,
            file: imageUrls, 
            createdBy
        });

        return patient;
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`);
    }
};
