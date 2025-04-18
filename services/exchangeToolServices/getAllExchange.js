import Exchange from "../../models/exchangeSchema.js";



export const getAllExchanges = async (user) => {
    try {
        const exchanges = await Exchange.find().populate("createdBy", "name email -role");

        const exchangesWithFavStatus = exchanges.map(exchange => ({
            ...exchange._doc,
            isFavExchange: (user.favoritesExchanges || []).some(fav => fav.toString() === exchange._id.toString()),
        }));

        return exchangesWithFavStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};