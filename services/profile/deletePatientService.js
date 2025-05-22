import Patient from "../../models/patientCaseSchema.js";

export const deletePatientService = async (studentId, patientId) => {
    try {
        const patient = await Patient.findOne({ _id: patientId, createdBy: studentId });

        if (!patient) {
            throw new Error("Patient not found or not authorized to delete");
        }

        await Patient.findByIdAndDelete(patientId);
        return { message: "Patient deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};