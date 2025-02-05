import { check,validationResult } from "express-validator";

export const signUpvalidator = [check('name').notEmpty().withMessage('Name is required'),
check('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
check('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), check('phone').notEmpty().withMessage('Phone number is required'),
check('phone').notEmpty().withMessage('Phone number is required')
    .isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits'),
    
check('universityID').notEmpty().withMessage('National ID is required'),
check('universityID').notEmpty().withMessage('universityID is required'),


(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
    }];

    export const loginValidator = [
        check('email').notEmpty().withMessage('email is missing')
            .isEmail().withMessage('invalid email'),
        check('password').notEmpty().withMessage('password is missing')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        (req, res, next)=> {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            next();
        }
    ]