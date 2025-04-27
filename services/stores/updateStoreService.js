import Store from "../../models/storeSchema.js";

export const updateStoreService = async (storeId, updateData) => {
    try {
        const store = await Store.findById(storeId);
        if (!store) {
            throw new Error("Store not found");
        }

        Object.keys(updateData).forEach((key) => {
            store[key] = updateData[key] || store[key];
        });

        await store.save();

        return store;
    } catch (error) {
        throw new Error(error.message);
    }
};