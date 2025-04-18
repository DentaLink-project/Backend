import Exchange from "../../models/exchangeSchema.js";
import { uploadImage } from "../imageService.js";


export const addExchangeService = async ({ name, toothName, exchangeWith, notes, contact, files, createdBy }) => {
    const images = files.length ? await uploadImage(files) : [];

    const newExchange = new Exchange({
        name,
        createdBy,
        toothName,
        exchangeWith,
        notes,
        contact,
        images 
    });

    await newExchange.save();
    return newExchange;
};