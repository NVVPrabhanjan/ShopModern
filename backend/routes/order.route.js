import express from "express"
import { placeOrder, getAllOrders, getUserOrders, updateOrderStatus } from "../controllers/order.controller.js"
import { protectAdmin } from "../middlewares/adminMiddleware.js";
import { protectUser } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/", protectUser, placeOrder);
router.get("/", protectAdmin, getAllOrders);
router.get("/my-orders", protectUser, getUserOrders);
router.put("/:id/status", protectAdmin, updateOrderStatus);

export default router;