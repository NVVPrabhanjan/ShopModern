import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 1,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
},
{timestamps: true});

export default mongoose.model("Product",productSchema);
