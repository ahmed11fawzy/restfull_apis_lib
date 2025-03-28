import { generateToken, verifyToken } from '../config/jwt';
import IUser from '../Interfaces/iUser';
import userModel from '../Model/userModel';
import { hashPassword, comparePassword } from '../utils/password';
import { generateResetCode, sendBasicEmail } from '../config/mail';
import { validationResult } from 'express-validator';
export const createUser = async (req: any, res: any, next: any) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await hashPassword(password);
            const user = await userModel.create({ name, email, password: hashedPassword });
        if (!user) {
            throw new Error('User registration failed');
            }
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            next(error);
        }
};

export const loginUser = async (req: any, res: any, next: any) => {
    try {
        
        // search for user

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select(' _id role status password').exec();
        console.log(user);
        if (!user) {
            throw new Error('User not found');
        }

        // check  password  
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid creadentials');
        }

        // send token in header

        const token = generateToken(user);
        res.header('Authorization', token);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        next(error);
    }
};

export const sendEmail = async (req: any, res: any, next: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(`invaild data ${errors.array()} `)
        }
        const {email}=req.body;
        const user=await userModel.findOne({email}).select(' _id resetPasswordExpires resetPasswordCode resetPasswordToken ').exec();
        if(!user){
            throw new Error('User not found');
        }
        const resetCode=generateResetCode();
        user.resetPasswordCode=resetCode;
        user.resetPasswordExpires= new Date(Date.now() + 3600000); // Expires in 1 hour
        await user.save();
        await sendBasicEmail(email,resetCode);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        next(error);
    }
};

export const verifyResetCode= async(req:any,res:any,next:any)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(`invaild data ${errors.array()} `)
        }
        const {email,resetCode}=req.body
        const user= await userModel.findOne({
            email,
            resetPasswordCode: resetCode,
            resetPasswordExpires: { $gt: new Date() }
        }).select('_id').exec();
        
        if(!user) {
            throw new Error('Invalid or expired reset code');
        }
        // Generate reset token
        const resetToken = generateToken(user);

        // Store reset token in user document
        user.resetPasswordToken = resetToken;
        await user.save();
        res.status(200).json({ message: 'Reset code verified successfully' });
    }
    catch(error){
        next(error);
    }
}


export const resetPassword=async(req:any,res:any ,next:any)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(`invaild data ${errors.array()} `)
        }
        const {resetToken,password}=req.body
        const decoded= verifyToken(resetToken)
        if(!decoded){
            throw new Error('invalid or expired token')
        }
        const user= await userModel.findOne({_id:decoded.id,
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now()}}).select('password resetPasswordToken ')
        
        if(!user){
            throw new Error('invalid or expired token')
        }
        // encrypt new password
        const hashedPassword= await hashPassword(password)
        // Update password
        
         user.password = hashedPassword;
         user.resetPasswordToken = '';
         user.resetPasswordCode = '';
         user.resetPasswordExpires =new Date(Date.now() + 3600000);
         await user.save();

         res.status(200).json({ message: 'Password change successfully' });
    }
    catch(error){
        next(error)
    }
}