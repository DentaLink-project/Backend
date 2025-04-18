import Patient from "../../models/patientCaseSchema.js";

export const fetchAllPatientsService = async (user) => {
    try {
        const allPatients = await Patient.find().populate("createdBy", "name email -role");

        const patientsWithFavoriteStatus = allPatients.map(patient => ({
            ...patient._doc,
            isFavPatient: user.favoritePatients.some(fav => fav.toString() === patient._id.toString()),
        }));

        return patientsWithFavoriteStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};