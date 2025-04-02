import Product from "../models/product.model.js"

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;
        const adminId = req.admin.id;
        if (adminId) {
            const product = await Product.create({ name, description, price, image, stock, adminId });
            res.status(201).json({ message: "Product added sucessfully" });
        }
        else {
            res.status(400).json({ message: "Product not added" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;
        const adminId = req.admin.id;
        const product = await Product.findOne({ _id: req.params.id, adminId });
        if (!product)
            return res.status(403).json({ message: "Not authorized  to update this product" })

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.stock = stock || product.stock;

        await product.save();
        res.status(201).json({ message: "Product updated sucessfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const adminId = req.admin.id;

    try {
        const product = await Product.findOne({ _id: req.params.id, adminId });
        if (!product) return res.status(403).json({ message: "Not authorized to delete this product" });

        await product.deleteOne();
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product)
            res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}