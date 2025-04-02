import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = User.findOne({email});
        if(existingUser){
            res.status(401).json({message: "User already exists"})
        } else{
        const user = await User.create({ name, email, password: hashedPassword })
        }
        res.status(201).json({ message: "User Registerd", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = User.findOne({ email });
        hashedPassword = await bcrypt.compare(password, user.password);
        if(user && hashedPassword){
            const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({token});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}