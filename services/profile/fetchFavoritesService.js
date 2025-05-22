import Student from "../../models/studentSchema.js";

export const fetchFavoritesService = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate({
            path: "favoriteTools",
            populate: { path: "createdBy", select: "name email -role" }
        })
        .populate({
            path: "favoritePatients",
            populate: { path: "createdBy", select: "name email -role" }
        })
        .populate({
            path: "favoritesExchanges",
            populate: { path: "createdBy", select: "name email -role" }
        });

        if (!student) {
           throw new Error("Student not found")
        }

        return {
            favoriteTools: student.favoriteTools,
            favoritePatients: student.favoritePatients,
            favoriteExchanges: student.favoritesExchanges
        };
    } catch (error) {
        throw new Error(error.message);
    }
};