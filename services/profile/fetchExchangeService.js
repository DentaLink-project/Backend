import Exchange from "../../models/exchangeSchema.js";
import Student from "../../models/studentSchema.js";


export const fetchExchangeService = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error("Student not found");
        }
        const exchanges = await Exchange.find({ createdBy: studentId }).populate("createdBy", "name email");
        const exchangesWithFavStatus = exchanges.map(exchange => ({
            ...exchange._doc,
            isFavExchange: student.favoritesExchanges.some(fav => fav.toString() === exchange._id.toString()),
        }));
        return exchangesWithFavStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};