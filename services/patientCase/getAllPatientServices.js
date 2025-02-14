import Patient from "../../models/patientCaseSchema.js";

export const getAllPatients = async (user) => {
    try {
        const patients = await Patient.find().populate("createdBy", "name email -role");

        const patientsWithFavStatus = patients.map(patient => ({
            ...patient._doc,
            isFavPatient: user.favorites.some(fav => fav.toString() === patient._id.toString()),
        }));

        return patientsWithFavStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};