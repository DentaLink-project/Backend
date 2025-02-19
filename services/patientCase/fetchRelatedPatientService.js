import Patient from "../../models/patientCaseSchema.js";



export const fetchPatientsByCategoryService = async (category) => {
    return await Patient.find({ category });
};
