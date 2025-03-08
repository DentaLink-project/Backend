import Student from "../../models/studentSchema.js";


export const toggleFavoriteExchange = async (studentId, exchangeId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error("Student not found");
        }
        if (!student.favoritesExchanges) {
            student.favoritesExchanges = [];
        }
        if (student.favoritesExchanges.includes(exchangeId.toString())) {
            student.favoritesExchanges = student.favoritesExchanges.filter(
                favId => favId.toString() !== exchangeId.toString()
            );
        } else {
            student.favoritesExchanges.push(exchangeId.toString());
        }
        await student.save();
        return { message: "Favorite status updated", isFavExchange: student.favoritesExchanges.includes(exchangeId.toString()) };
    } catch (error) {
        console.error("Error in toggleFavoriteExchange:", error);
        throw new Error(error.message);
    }
};

