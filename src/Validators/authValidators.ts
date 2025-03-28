import { regValidator, loginValidator } from '../ajv/authSchema';
import { body } from 'express-validator';
export const regValidation = (req: any, res: any, next: any) => {
    try {
        const regValidat = regValidator(req.body);
        if (!regValidat) {
            throw new Error('validation failed');            
        }
        next();
    }
    catch (err: Error | any) {
        res.status(400).json({ message: err.message });
    }
};


export const loginValidation = (req: any, res: any, next: any) => {
    try {
        const loginValidat = loginValidator(req.body);
        if (!loginValidat) {
            throw new Error('validation failed');            
        }
        next();
    }
    catch (err: Error | any) {
        res.status(400).json({ message: err.message });
    }
};

export const verificationData=
    [
        body('resetCode').isLength({ min: 6, max: 6 }).withMessage('Reset code must be 6 digits'),
        body('email').isEmail().withMessage('Please enter a valid email')
    ]

export const resetPassValidation =
    [
        body('resetToken').exists().withMessage('Reset token is required'),
        body('password')
        .notEmpty().withMessage('Password is required')
        .custom((value) => {
            // Custom password validation logic
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
                throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
            }
            return true; // Validation passed
        }),
    ]


export const forgetPassValidation=[
    body('email').isEmail().withMessage('Please enter a valid email')
]