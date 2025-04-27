import Store from "../../models/storeSchema.js";

export const createStoreService = async ({ name, address, contactInfo, about, tools }) => {
    try {
        const store = await Store.create({ name, address, contactInfo, about, tools });
        return store;
    }
    catch (error) {
        throw new Error(error.message);
    }
}