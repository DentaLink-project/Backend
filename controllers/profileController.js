import { fetchToolsService } from "../services/profile/fetchToolsService.js";
import { fetchFavoritesService } from "../services/profile/fetchFavoritesService.js";
import { updateToolService } from "../services/profile/updateToolService.js";
import { deleteToolService } from "../services/profile/deleteToolService.js";
import { fetchPatientService } from "../services/profile/fetchPatientService.js";
import { updatePatientService } from "../services/profile/updatePatientService.js";
import { deletePatientService } from "../services/profile/deletePatientService.js";
import { fetchExchangeService } from "../services/profile/fetchExchangeService.js";
import { deleteExchangeService } from "../services/profile/deleteExchangeService.js";
import { fetchOrderService } from "../services/profile/fetchOrderService.js";
import Student from "../models/studentSchema.js";


export const fetchTools = async (req, res) => {
    try {
        const tools = await fetchToolsService(req.student);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchFavorites = async (req, res) => {
    try {
        const tools = await fetchFavoritesService(req.student._id);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTool = async (req, res) => {
    try {
        const result = await deleteToolService(req.student._id, req.params.toolId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTool = async (req, res) => {
    try {
        const updatedTool = await updateToolService(
            req.student._id,
            req.params.id,
            req.body,
            req.files
        );
        res.status(200).json(updatedTool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchPatient = async (req, res) => {
    try {
        const studentId = req.student._id; 
        
        const patients = await fetchPatientService(studentId);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const studentId = req.student._id;
        const { id } = req.params;
        const updateData = req.body;
        const files = req.files;  

        const updatedPatient = await updatePatientService(studentId, id, updateData, files);

        res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const studentId = req.student._id;
        const { patientId } = req.params; 
        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }
        const result = await deletePatientService(studentId, patientId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchExchanges = async (req, res) => {
    try {
        const studentId = req.student._id; 

        const exchanges = await fetchExchangeService(studentId);
        res.status(200).json(exchanges);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch exchanges", error: error.message });
    }
};

export const deleteExchange = async (req, res) => {
    try {
        const exchangeId = req.params.id;
        const studentId = req.student._id; 

        const result = await deleteExchangeService(exchangeId, studentId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const fetchOrders = async (req, res) => {
    try {
        const studentId = req.student._id;
        const orders = await fetchOrderService(studentId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
