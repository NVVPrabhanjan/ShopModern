import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"

export const registerAdmin = async (req, res ) => {
    try{
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.name);
            return res.status(401).json({ message: "Admin already exists" });
        }
        else{
            const admin = await Admin.create(({name, email, password: hashedPassword}));
            res.status(201).json({message: "Admin is registered successfully"});
        }
    }catch ( error){
        res.status(400).json({error : error.message})
    }
}

export const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin)
            res.status(404).json({message: "User doesnt exists"});

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch)
            res.status(404).json({message: "Invaild passord"});

        const token = jwt.sign({ id: admin._id}, process.env.JWT_SECRET, {expiresIn: "2h"});
        res.json({ token, adminId: admin._id });
    } catch(error){
        res.status(400).json({ error: error.message})
    }
}