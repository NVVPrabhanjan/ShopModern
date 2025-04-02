import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected sucessfully");
    }
    catch (error){
        console.log("DataBase Connection failed ", error);
    }
}
export default connectDB;