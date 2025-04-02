import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"

export const protectAdmin = async (req, res, next) => {
    const token = req.header.authorization;

    if(!token)
        res.status(401).json({message: "No toekn is provided"})
    try{
        const decoded = jwt.verify(token, process.env,JWT_SECRET);
        const admin = await Admin.findById(decoded.id)
        if(!admin)
            res.status(403).json({message: "Access Denied"})

        req.admin = admin
        next();
    }catch(error){
        res.status(401).json({message: "Invalid token"})
    }
};