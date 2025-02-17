import Student from "../../models/studentSchema.js";

export const toggleFavouritePatientService = async (studentId, patientId) => {
    try {
        const foundStudent = await Student.findById(studentId);
        if (!foundStudent) {
            throw new Error("Student not found");
        }

        if (foundStudent.favorites.includes(patientId)) {
            foundStudent.favorites = foundStudent.favorites.filter(
                (favId) => favId.toString() !== patientId
            );
            await foundStudent.save();

            return "Patient removed from favorites";
        } else {
            foundStudent.favorites.push(patientId);
            await foundStudent.save();

            return "Patient added to favorites";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};