import Student from "../models/studentSchema.js";

export const getToolFavorite = async (studentId) => {
    const student = await Student.findById(studentId).populate("favoriteTools"); 

    if (!student) {
        throw new Error("Student not found");
    }

    return student.favoriteTools; 
};
