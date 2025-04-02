import express from "express"
import connectDB from "./utils/db.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.listen (express.json());
app.get('/',(req, res) => {
    res.send("Server is running");
})
PORT = process.env.PORT
app.listen( PORT, async () => {
    connectDB();
    console.log(`Server is Running : http://localhost:${PORT}`)
})