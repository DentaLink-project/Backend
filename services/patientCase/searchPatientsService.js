import Patient from "../../models/patientCaseSchema.js";

export const searchPatientsService = async (title) => {
    try {
        const searchResults = await Patient.find({ $text: { $search: title } });

        if (!searchResults.length) {
            throw new Error("No patients found with this title");
        }

        return searchResults;
    } catch (error) {
        throw new Error(error.message);
    }
};