import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    try {
        const token = req.cookies?.token;
        if(!token){
            res.status(401).json({success: false, message: "Unauthorized access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({success: false, message: "Unauthorized access-- Invalid token"});
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("error in veriying token: ",error);
        return res.status(500).json({success:false, message: "server error"})
    }
}