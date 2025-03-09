import { User}  from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndsetCookie  } from "../utils/generateTokenAndsetCookie.js"
import {sendVerificationEmail} from "../mailtrap/email.js"


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


export const login = async () => {};
export const logout = async () => {};