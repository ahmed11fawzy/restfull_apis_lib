import Ajv from 'ajv';
const ajv = new Ajv();

const registerSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 3
        },
        "email": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        }
    },
    "required": ["name", "email", "password"],
    "additionalProperties": false
};

const loginSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        }
    },
    "required": ["email", "password"],
    "additionalProperties": false
};




export const regValidator = ajv.compile(registerSchema);
export const loginValidator = ajv.compile(loginSchema);