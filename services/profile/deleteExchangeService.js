import Exchange from "../../models/exchangeSchema.js";

export const deleteExchangeService = async (exchangeId, studentId) => {
    const exchange = await Exchange.findOne({ _id: exchangeId, publisher: studentId });

    if (!exchange) {
        throw new Error("Exchange not found or you do not have permission to delete it");
    }

    await Exchange.deleteOne({ _id: exchangeId });
    return { message: "Exchange deleted successfully!" };
};