import Patient from "../../models/patientCaseSchema.js";
import Student from "../../models/studentSchema.js";

export const fetchPatientByIdService = async (id, studentId) => {
    try {
        const foundPatient = await Patient.findById(id).populate("createdBy", "name email -role");

        if (!foundPatient) {
            throw new Error("Patient not found");
        }
        const foundStudent = await Student.findById(studentId);
        const isFavoritePatient = foundStudent.favorites.some(fav => fav.toString() === foundPatient._id.toString());

        return { ...foundPatient._doc, isFavoritePatient };
    } catch (error) {
        throw new Error(error.message);
    }
};