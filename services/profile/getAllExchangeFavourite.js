import Student from "../../models/studentSchema.js";


export const getFavoriteExchanges = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate({
            path: "favoritesExchanges",
            populate: { path: "publisher", select: "name email -role" }
        });

        if (!student) {
            throw new Error("Student not found");
        }

        return student.favoritesExchanges.map(exchange => ({
            ...exchange.toObject(),
            isFavExchange: true
        }));
    } catch (error) {
        throw new Error(error.message);
    }
};

