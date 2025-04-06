import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("items.productId", "name price image");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOneAndDelete({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};