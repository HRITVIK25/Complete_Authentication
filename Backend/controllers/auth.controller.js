import { User }  from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndsetCookie  } from "../utils/generateTokenAndsetCookie.js"
import {sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} from "../mailtrap/email.js"
import crypto from "crypto";
import { verifyToken } from "../middlewares/verifyToken.js"

export const signup = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({success:false, message: "Please provide all fields"})
        };

        const userAlreadyExists = await User.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({success:false, message: "User already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        });

        await user.save();

        // jwt
        generateTokenAndsetCookie(res,user._id);

        sendVerificationEmail(user.email,verificationToken)

        res.status(200).json({
            success: true, 
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req,res) => {
    const {code} =  req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()} // makes sure token is not expired
        });

        if(!user) {
            return res.status(400).json({success:false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        
		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});

    } catch (error) {
        console.log("error verifying email: ",error);
        return res.status(400).json({success:false, message: error.message})
    }
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({status:false,message:"All fields are neccessary"});
        };

        const user = await User.findOne({email})

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).json({status:false,message:"Invalid credentials"});
        };
        generateTokenAndsetCookie(res, user._id);

        user.lastLogin = new Date;

        res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				...user._doc,
				password: undefined,
			},
		});


    } catch (error) {
        console.log("error loggin in: ",error);
        return res.status(400).json({success:false, message: error.message})
    }
};

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({success:true, message: "Logged out successfully"});
};

export const forgotPassword = async (req,res) => {
    const { email } = req.body;

    try {
        if(!email){
            return res.status(400).json({success:false, message: "All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message: "User does not exist"});
        };

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true, message: "Password reset link sent to your email"});

    } catch (error) {
        console.log("error forgot password: ",error);
        return res.status(400).json({success:false, message: error.message});
    }
};

export const resetPassword = async (req,res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt : {$gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({success:false, message: "Inavlid or expired token"});
        };

        // Update password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:true, message: "Password reset successfully"});
    } catch (error) {
        console.log("error reset password: ",error);
        return res.status(400).json({success:false, message: error.message});
    }
};

export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({success:false, message: "user not found"});
        };

        res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    } catch (error) {
        console.log("error checking auth: ",error);
        return res.status(400).json({success:false, message: error.message});
    }
}