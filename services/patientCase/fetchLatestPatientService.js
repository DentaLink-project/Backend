import Patient from "../../models/patientCaseSchema.js";


export const fetchLatestPatientsService = async () => {
    return await Patient.find().sort({ createdAt: -1 }).limit(10);
};
