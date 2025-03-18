import Patient from "../../models/patientCaseSchema.js";

export const fetchLatestPatientsService = async (user) => {
    try {
        const latestPatients = await Patient.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("createdBy", "name email -role");

        const patientsWithFavoriteStatus = latestPatients.map(patient => ({
            ...patient._doc,
            isFavPatient: user.favorites.some(fav => fav.toString() === patient._id.toString()),
        }));

        return patientsWithFavoriteStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};