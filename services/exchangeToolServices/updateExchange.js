import Exchange from "../../models/exchangeSchema.js";
import { uploadImage } from "../imageService.js";

export const updateExchangeService = async (studentId, exchangeId, updateData, files) => {
    try {
        const exchange = await Exchange.findOne({ _id: exchangeId, publisher: studentId });
        if (!exchange) {
            throw new Error("Exchange not found or you do not have permission to update it");
        }
        Object.assign(exchange, updateData);
        if (files && files.length > 0) {
            const imageUrls = await uploadImage(files);
            exchange.images = imageUrls;
        }
        await exchange.save();

        return exchange;
    } catch (error) {
        throw new Error(error.message);
    }
};
