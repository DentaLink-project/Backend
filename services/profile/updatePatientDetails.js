import Patient from "../../models/patientCaseSchema.js";
import { uploadImage } from "../imageService.js";

export const updatePatientService = async (studentId, patientId, updateData, files) => {
    try {
        const patient = await Patient.findOne({ _id: patientId, createdBy: studentId });

        if (!patient) {
            throw new Error("Patient not found or not authorized");
        }

        Object.assign(patient, updateData);
        if (files && files.length > 0) {
            const imageUrls = await uploadImage(files);
            patient.images = imageUrls;  
        }

        await patient.save();
        return patient;
    } catch (error) {
        throw new Error(error.message);
    }
};


