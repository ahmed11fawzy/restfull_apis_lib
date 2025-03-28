import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest' ,'moderator'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordCode: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date || Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;