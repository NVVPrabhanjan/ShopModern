import express from "express"
import connectDB from "./utils/db.js"
import dotenv from "dotenv";
import adminRoute from "./routes/admin.route.js"
import orderRoute from "./routes/order.route.js"
import productRoute from "./routes/product.route.js"
import userRoute from "./routes/user.route.js"
import cartRoute from "./routes/cart.route.js"
import cors from "cors"
dotenv.config();
const app = express();
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json());
app.get('/',(req, res) => {
    res.send("Server is running");
})
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/cart", cartRoute);
const PORT = process.env.PORT;
app.listen( PORT, async () => {
    connectDB();
    console.log(`Server is Running : http://localhost:${PORT}`)
})