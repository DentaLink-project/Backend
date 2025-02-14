import Patient from "../../models/patientCaseSchema.js";

export const updatePatientService = async (studentId, patientId, updateData) => {
    try {
        const patient = await Patient.findOne({ _id: patientId, createdBy: studentId });

        if (!patient) {
            throw new Error("Patient not found or not authorized");
        }

        Object.assign(patient, updateData); 

        await patient.save();
        return patient;
    } catch (error) {
        throw new Error(error.message);
    }
};
