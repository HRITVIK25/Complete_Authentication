import jwt from "jsonwebtoken";

export const generateTokenAndsetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token",token,{
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        // in development it will be http and in production it will be https
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};
