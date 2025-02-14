import Patient from "../../models/patientCaseSchema.js";

export const getPatientByTitle = async (title) => {
    try {
        const patients = await Patient.find({ title: { $regex: title, $options: "i" } });

        if (!patients.length) {
            throw new Error("No patients found with this title");
        }

        return patients;
    } catch (error) {
        throw new Error(error.message);
    }
};