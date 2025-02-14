import Patient from "../../models/patientCaseSchema.js";
import { uploadImage } from "../imageService.js";

export const addPatient = async ({ name, title, age, gender, phone, category, description,location, file, createdBy }) => {
    try {
        let imageUrl = null;

        if (!file) {
            throw new Error("Case file is required");
        }
        imageUrl = await uploadImage(file);

        const patient = await Patient.create({
            name,
            age: parseInt(age),
            gender,
            phone,
            title,
            category,
            description,
            location,
            file: imageUrl,
            createdBy
        });

        return patient;
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`);
    }
};
