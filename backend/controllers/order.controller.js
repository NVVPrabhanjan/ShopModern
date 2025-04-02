import Order from "../models/order.model.js"
import Product from "../models/product.model.js"

export const placeOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = re1.user.id;

        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findOne(item.productId);
            if (!product)
                res.status(404).json({ message: "Product not found" });
            totalAmount += product.price * item.quantity;
        }
        const newOrder = await Order.create({ userId, products, totalAmount });
        res.status(201).json({ message: "Order places successfully " });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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