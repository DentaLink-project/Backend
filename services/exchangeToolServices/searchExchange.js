import Exchange from "../../models/exchangeSchema.js";


export const searchExchangesService = async (query, user) => {
    try {
        const exchanges = await Exchange.find({ $text: { $search: query } })
            .populate("createdBy", "name email -role");

        if (!exchanges.length) {
            throw new Error("No exchanges found with this tooth name");
        }

        const exchangesWithFavStatus = exchanges.map(exchange => ({
            ...exchange._doc,
            isFavExchange: (user.favoritesExchanges || []).some(fav => fav.toString() === exchange._id.toString()),
        }));

        return exchangesWithFavStatus;

        return exchanges;
    } catch (error) {
        throw new Error(error.message);
    }
};
