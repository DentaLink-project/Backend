import { check, validationResult } from "express-validator";

export const exchangeValidator = [
    check("toothName")
        .notEmpty().withMessage("Tooth name is required"),

    check("exchangeWith")
        .notEmpty().withMessage("Exchange with is required"),

    check("notes")
        .optional()
        .isString().withMessage("Notes must be a string"),

    check("contact")
        .notEmpty().withMessage("Contact number is required")
        .isLength({ min: 11, max: 11 }).withMessage("Contact number must be exactly 11 digits"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
