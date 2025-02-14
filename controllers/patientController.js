import Student from "../models/studentSchema.js";
import { addPatient } from "../services/patientCase/addPatientServices.js";
import { deletePatientById } from "../services/patientCase/deletePatientByIdServices.js";
import { getFavoritePatients } from "../services/patientCase/getAllFavouritePatient.js";
import { getAllPatients } from "../services/patientCase/getAllPatientServices.js";
import { getPatientById} from "../services/patientCase/getPatientByIdServices.js";
import { getPatientByTitle } from "../services/patientCase/getPatientByTitle.js";
import { getPatientsByUser } from "../services/patientCase/getPatientByUserService.js";
import toggleFavorite from "../services/patientCase/toggleFavouritePatient.js";
import { updatePatientService } from "../services/patientCase/updatePatientDetails.js";

//=============================**createPatient**===================================
export const createPatient = async (req, res) => {
    try {
        const { name, title, age, gender, phone, category, description } = req.body;
        const file = req.file;

        const patient = await addPatient({
            name,
            title,
            age,
            gender,
            phone,
            category,
            description,
            file,
            createdBy: req.student.id 
        });

        res.status(201).json({ message: "Patient added successfully", patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//=============================**fetchPatientsByTitle**===================================
export const fetchPatientsByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title is required for search" });
        }
        const patients = await getPatientByTitle(title);
        res.status(200).json(patients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
//=============================**fetchPatientById**===================================
export const fetchPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.student._id; 

        const patient = await getPatientById(id, studentId);
        
        res.status(200).json(patient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
//=============================**fetchAllPatients**===================================

export const fetchAllPatients = async (req, res) => {
    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);

        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patients", error: error.message });
    }
};