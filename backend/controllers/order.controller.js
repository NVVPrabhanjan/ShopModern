import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user.id;
        let totalAmount = 0;
        const orderedProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.productId} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }
            product.stock -= item.quantity;
            await product.save();
            totalAmount += product.price * item.quantity;
            orderedProducts.push({ productId: product._id, quantity: item.quantity });
        }
        const newOrder = await Order.create({ userId, products: orderedProducts, totalAmount });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}