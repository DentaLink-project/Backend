import Exchange from "../../models/exchangeSchema.js";
import { uploadImage } from "../imageService.js";

export const updateExchangeService = async (exchangeId, { name, toothName, exchangeWith, notes, contact, files, updatedBy }) => {
    const existingExchange = await Exchange.findById(exchangeId);
    if (!existingExchange) {
        throw new Error("Exchange not found");
    }

    const images = files?.length ? await uploadImage(files) : existingExchange.images;

    existingExchange.name = name || existingExchange.name;
    existingExchange.toothName = toothName || existingExchange.toothName;
    existingExchange.exchangeWith = exchangeWith || existingExchange.exchangeWith;
    existingExchange.notes = notes || existingExchange.notes;
    existingExchange.contact = contact || existingExchange.contact;
    existingExchange.images = images;
    existingExchange.updatedBy = updatedBy;

    await existingExchange.save();

    return existingExchange;
};