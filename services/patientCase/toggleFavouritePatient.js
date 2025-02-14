import Student from "../../models/studentSchema.js";

const toggleFavorite = async (studentId, patientId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
        throw new Error("Student not found");
        }

        if (student.favorites.includes(patientId)) {
        student.favorites = student.favorites.filter(
            (favId) => favId.toString() !== patientId
        );
        await student.save();
        return "Patient removed from favorites";
        } else {
        student.favorites.push(patientId);
        await student.save();
        return "Patient added to favorites";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
export default toggleFavorite