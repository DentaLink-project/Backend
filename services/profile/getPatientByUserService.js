import Patient from "../../models/patientCaseSchema.js";

export const getPatientsByUser = async (user) => {
    try {
        const patients = await Patient.find({ createdBy: user._id })
            .populate("createdBy", "name email");
        const patientsWithFavStatus = patients.map(patient => ({
            ...patient._doc,
            isFavPatient: user.favorites.some(fav => fav.toString() === patient._id.toString()),
        }));

        return patientsWithFavStatus;
    } catch (error) {
        throw new Error(`Error fetching patients: ${error.message}`);
    }
};


