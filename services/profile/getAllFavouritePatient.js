import Student from "../../models/studentSchema.js";

export const getFavoritePatients = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate({
            path: "favorites",
            populate: { path: "createdBy", select: "name email -role" }
        });
        if (!student) {
            throw new Error("Student not found");
        }
        return student.favorites.map(patient => ({
            ...patient.toObject(),
            isFavPatient: true
        }));
    } catch (error) {
        throw new Error(error.message);
    }
};
