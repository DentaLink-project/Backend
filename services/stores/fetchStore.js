import Store from "../../models/storeSchema.js";

export const fetchStoreService = async (storeId) => {
    try {
        const foundStore = await Store.findById(storeId);

        if (!foundStore) {
            throw new Error("Store not found");
        }

        return foundStore;
    }
    catch (error) {
        throw new Error(error.message);
    }
}