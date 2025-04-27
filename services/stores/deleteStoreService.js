import Store from "../../models/storeSchema.js";

export const deleteStoreService = async (storeId) => {
    try {
        const store = await Store.findById(storeId);
        if (!store) {
            throw new Error("Store not found");
        }

        await store.deleteOne()

        return { message: "Store deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};