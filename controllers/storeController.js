import { createStoreService } from "../services/stores/createStoreService.js";
import { updateStoreService } from "../services/stores/updateStoreService.js";
import { deleteStoreService } from "../services/stores/deleteStoreService.js";
import { fetchStoreService } from "../services/stores/fetchStore.js";

export const createStoreController = async (req, res) => {
    try {
        const { name, address, contactInfo, about, tools } = req.body;

        const store = await createStoreService({ name, address, contactInfo, about, tools });

        res.status(201).json({ message: "Store created successfully", store });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateStoreController = async (req, res) => {
    try {
        const storeId = req.params.id;
        const updateData = req.body;

        const updatedStore = await updateStoreService(storeId, updateData);

        res.status(200).json({ message: "Store updated successfully", store: updatedStore });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getStoreByIdController = async (req, res) => {
    try {
        const storeId = req.params.id;
        const store = await fetchStoreService(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStoreController = async (req, res) => {
    try {
        const storeId = req.params.id;

        const result = await deleteStoreService(storeId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};