import Patient from "../../models/patientCaseSchema.js";
import Student from "../../models/studentSchema.js";

export const getPatientById = async (id, studentId) => {
    try {
        const patient = await Patient.findById(id).populate("createdBy", "name email -role");

        if (!patient) {
            throw new Error("Patient not found");
        }
        const student = await Student.findById(studentId);
        const isFavPatient = student.favorites.some(fav => fav.toString() === patient._id.toString());
        return { ...patient._doc, isFavPatient };
    } catch (error) {
        throw new Error(error.message);
    }
};