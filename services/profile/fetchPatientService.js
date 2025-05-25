import Patient from "../../models/patientCaseSchema.js";
import Student from "../../models/studentSchema.js";

export const fetchPatientService = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        const patients = await Patient.find({ createdBy: student._id })
            .populate("createdBy", "name email");
        const patientsWithFavStatus = patients.map(patient => ({
            ...patient._doc,
            isFavPatient: student.favoritePatients.some(fav => fav.toString() === patient._id.toString()),
        }));

        return patientsWithFavStatus;
    } catch (error) {
        throw new Error(`Error fetching patients: ${error.message}`);
    }
};