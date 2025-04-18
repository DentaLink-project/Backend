import { check, validationResult } from "express-validator";

export const toolValidator = [
    check("toolName").notEmpty().withMessage("Tool name is required"),
    check("price").notEmpty().isNumeric().withMessage("Price is required"),
    check("description").notEmpty().withMessage("Describtion is required"),
    check("category").notEmpty().withMessage("Category is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

