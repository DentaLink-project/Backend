import Exchange from "../../models/exchangeSchema.js";


export const getExchangesByToothName = async (toothName) => {
    try {
        const exchanges = await Exchange.find({ $text: { $search: toothName } })
            .populate("publisher", "name email");

        if (!exchanges.length) {
            throw new Error("No exchanges found with this tooth name");
        }

        return exchanges;
    } catch (error) {
        throw new Error(error.message);
    }
};
