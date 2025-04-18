import Patient from "../../models/patientCaseSchema.js";

export const searchPatientsService = async (query, user) => {
    try {
        const searchResults = await Patient.find({ $text: { $search: query } }).populate("createdBy", "name email -role");

        if (!searchResults.length) {
            throw new Error("No results found for your search");
        }

        const searchResultsWithFavorite = searchResults.map(patient => ({
            ...patient._doc,
            isFavPatient: user.favoritePatients.some(fav => fav.toString() === patient._id.toString()),
        }));

        return searchResultsWithFavorite;
    } catch (error) {
        throw new Error(error.message);
    }
};