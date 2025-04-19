import Student from "../models/studentSchema.js";
import { deletePatientById } from "../services/profile/deletePatientByIdServices.js";
import {deleteExchangeService} from '../services/profile/deleteExchange.js'
import { getFavoritePatients } from "../services/profile/getAllFavouritePatient.js";
import {getFavoriteExchanges} from '../services/profile/getAllExchangeFavourite.js'
import { getExchangesByUser } from "../services/profile/getExchangeByUser.js";
import { getPatientsByUser } from "../services/profile/getPatientByUserService.js";
import { updatePatientService } from "../services/profile/updatePatientDetails.js";



//=============================**fetchPatientsByUser**===================================
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

