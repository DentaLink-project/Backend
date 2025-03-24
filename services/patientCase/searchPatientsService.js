import Patient from "../../models/patientCaseSchema.js";

export const searchPatientsService = async (query) => {
    try {
        const searchResults = await Patient.find({ $text: { $search: query } });

        if (!searchResults.length) {
            throw new Error("No results found for your search");
        }

        return searchResults;
    } catch (error) {
        throw new Error(error.message);
    }
};