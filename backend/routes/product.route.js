import express from "express"
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/product.controller.js"
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();
router.get("/getProductById", getProductById);
router.get("/allproducts", getAllProducts);
router.post("/create", protectAdmin, createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

export default router;