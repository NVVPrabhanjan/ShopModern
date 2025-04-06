import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type : String, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
