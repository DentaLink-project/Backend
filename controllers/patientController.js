import Student from "../models/studentSchema.js";
import { createPatientService } from "../services/patientCase/createPatientService.js";
import { fetchAllPatientsService } from "../services/patientCase/fetchAllPatientsService.js";
import { fetchLatestPatientsService } from "../services/patientCase/fetchLatestPatientService.js";
import { fetchPatientByIdService } from "../services/patientCase/fetchPatientByIdService.js";
import { fetchPatientsByCategoryService} from "../services/patientCase/fetchRelatedPatientService.js";
import { searchPatientsService } from "../services/patientCase/searchPatientsService.js";
import { toggleFavouritePatientService } from "../services/patientCase/toggleFavouritePatientService.js";

export const createPatient = async (req, res) => {
    try {
        const { name, title, age, gender, phone, category, location, description } = req.body;
        const images = req.files;

        const patient = await createPatientService({
            name,
            title,
            age,
            gender,
            phone,
            category,
            location,
            description,
            images, 
            createdBy: req.student.id
        });

        res.status(201).json({ message: "Patient added successfully", patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchPatients = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title is required for search" });
        }
        const patients = await searchPatientsService(title);
        res.status(200).json(patients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.student._id; 

        const patient = await fetchPatientByIdService(id, studentId);
        
        res.status(200).json(patient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchAllPatients = async (req, res) => {
    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const patients = await fetchAllPatientsService(user); 
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patients", error: error.message });
    }
};

export const toggleFavouritePatient = async (req, res) => {
    try {
        const studentId = req.student._id; 
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }
            const result = await toggleFavouritePatientService(studentId, patientId);
            res.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error("Error in toggleFavoriteController:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}


export const fetchPatientsByCategory = async (req, res) => {
    try {
        const { category } = req.params;          
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }
        const patients = await fetchPatientsByCategoryService(category);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchLatestPatients = async (req, res) => {
    try {
        const latestPatients = await fetchLatestPatientsService();
        res.status(200).json(latestPatients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
