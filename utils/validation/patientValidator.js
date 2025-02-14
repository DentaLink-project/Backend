import { check, validationResult } from "express-validator";

export const patientCaseValidator = [
    check("name").notEmpty().withMessage("Patient name is required"),
    check("age").notEmpty().withMessage("Age is required").isNumeric().withMessage("Age must be a number"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("phone").notEmpty().withMessage("Phone number is required").isLength({ min: 11, max: 11 }).withMessage("Phone number must be exactly 11 digits"),
    check("title").notEmpty().withMessage("Case title is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("category").notEmpty().withMessage("Category is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


export const validatePatientUpdate = [
    check("name").notEmpty().withMessage("Patient name is required"),
    check("age").notEmpty().withMessage("Age is required").isNumeric().withMessage("Age must be a number"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("phone").notEmpty().withMessage("Phone number is required").isLength({ min: 11, max: 11 }).withMessage("Phone number must be exactly 11 digits"),
    check("title").notEmpty().withMessage("Case title is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("category").notEmpty().withMessage("Category is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];





