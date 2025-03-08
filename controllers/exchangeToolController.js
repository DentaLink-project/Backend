import Student from "../models/studentSchema.js";
import { addExchangeService } from "../services/exchangeToolServices/addExchange.js";
import { getAllExchanges } from "../services/exchangeToolServices/getAllExchange.js";
import { getExchangesByToothName } from "../services/exchangeToolServices/searchExchange.js";
import { toggleFavoriteExchange } from "../services/exchangeToolServices/toggleFavouriteExchange.js";
import { updateExchangeService } from "../services/exchangeToolServices/updateExchange.js";



export const addExchange = async (req, res) => {
    try {
        const { name, toothName, exchangeWith, notes, contact } = req.body;
        const studentId = req.student._id;

        const exchange = await addExchangeService({
            name,
            toothName,
            exchangeWith,
            notes,
            contact,
            files: req.files, 
            studentId
        });

        res.status(201).json(exchange);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchAllExchanges = async (req, res) => {
    try {
        const userId = req.student._id;
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const exchanges = await getAllExchanges(user);
        res.status(200).json(exchanges);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch exchanges", error: error.message });
    }
};

