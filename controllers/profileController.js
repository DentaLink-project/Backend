import Student from "../models/studentSchema.js";
import { deletePatientById } from "../services/profile/deletePatientByIdServices.js";
import {deleteExchangeService} from '../services/profile/deleteExchange.js'
import { getFavoritePatients } from "../services/profile/getAllFavouritePatient.js";
import {getFavoriteExchanges} from '../services/profile/getAllExchangeFavourite.js'
import { getExchangesByUser } from "../services/profile/getExchangeByUser.js";
import { getPatientsByUser } from "../services/profile/getPatientByUserService.js";
import { updatePatientService } from "../services/profile/updatePatientDetails.js";
import { getMyOrdersService } from "../services/profile/getMyOrderServices.js";



export const fetchPatientsByUser = async (req, res) => {
    try {
        const user = await Student.findById(req.student._id).populate("favorites"); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const patients = await getPatientsByUser(user);
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchFavoritePatients = async (req, res) => {
    try {
        const studentId = req.student._id;
        const favoritePatients = await getFavoritePatients(studentId);
        res.status(200).json(favoritePatients);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch favorites", error: error.message });
    }
};

export const editPatient = async (req, res) => {
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
        const result = await deletePatientById(studentId, patientId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchExchangesByUser = async (req, res) => {
    try {
        const studentId = req.student._id; 

        const exchanges = await getExchangesByUser(studentId);
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

export const fetchFavoriteExchanges = async (req, res) => {
    try {
        const studentId = req.student._id; 
        const favoriteExchanges = await getFavoriteExchanges(studentId);
        
        res.status(200).json(favoriteExchanges);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch favorite exchanges", error: error.message });
    }
};

export const getMyOrdersController = async (req, res) => {
    try {
        const studentId = req.student._id;
        const orders = await getMyOrdersService(studentId);
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
