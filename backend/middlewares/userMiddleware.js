import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectUser = async (req, res, next) => {
    const token = req.header.authorization

    if(!token)
        res.status(401).json ({message: "Token not provided"})
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
            res.status(403).json({message: "Access Denied"})
        req.user = user;
        next();
    } catch(error){
        res.status(401).json({message: "Token is not generated"});
    }
}