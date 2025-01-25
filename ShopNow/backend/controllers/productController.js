const productModel = require("../models/productModel");
const authModel = require("../models/authModel");

class ProductController {

    static addProduct = async (req, res) => {
        const { name, description, price, category, brand, stock, images } = req.body;
        const seller = req.user._id;
        console.log('User ID:', req.user._id);

        try {
            if (!name || !category || !price || !description) {
                return res.status(400).json("Please fill all the fields");
            }

            const notUser = await authModel.findById(seller);
            if (!notUser) {
                return res.status(404).json("Seller not found");
            }


            const isProductExist = await productModel.findOne({ name, description, price, category, seller })
            if (isProductExist) {
                return res.status(409).json("Product already exist");
            }

            const product = await productModel.create({
                name, description, price, category, brand, stock, images, seller
            });

            const populatedProduct = await productModel.findById(product._id).populate('seller', 'username');

            return res.status(200).json({
                product: {
                    _id: populatedProduct._id,
                    name: populatedProduct.name,
                    description: populatedProduct.description,
                    price: populatedProduct.price,
                    category: populatedProduct.category,
                    brand: populatedProduct.brand,
                    stock: populatedProduct.stock,
                    images: populatedProduct.images,
                    seller: populatedProduct.seller.username, // Show username here
                    createdAt: populatedProduct.createdAt,
                    updatedAt: populatedProduct.updatedAt,
                },
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    static getAllProducts = async (req, res) => {
        const products = await productModel.find();
        res.send(products);
    }

    static getSingleProduct = async (req, res) => {
        const product = await productModel.findById(req.params.id);
        res.send(product);
    }

    static filterProducts = async (req, res) => {
        try {
            const { price, category, date } = req.query;
            console.log(req.query);
            const queryParams = req.query.toString();
            console.log(queryParams);
            const filter = {};

            // Add price filter 
            if (price) {
                const [minPrice, maxPrice] = price.split('-').map(Number);
                filter.price = {
                    $gte: minPrice || 0,
                    $lte: maxPrice || Number.MAX_SAFE_INTEGER
                };
            }

            // Add category filter
            if (category) {
                filter.category = category;
            }

            if (date) {
                try {
                    const [startDate, endDate] = date.split('-').map(d => d.trim());
                    console.log(startDate, endDate);
                    const formattedStartDate = startDate.replace(/\//g, '-');
                    const formattedEndDate = endDate.replace(/\//g, '-');
                    console.log(formattedStartDate);
                    if (startDate && endDate) {
                        filter.createdAt = {
                            $gte: new Date(`${formattedStartDate}T00:00:00.000Z`), // Start of the day in UTC
                            $lte: new Date(`${formattedEndDate}T23:59:59.999Z`), // End of the day in UTC
                        };
                    } else {
                        throw new Error('Invalid date range');
                    }
                } catch (error) {
                    return res.status(400).json({
                        message: 'Invalid date format. Please use "YYYY-MM-DD - YYYY-MM-DD".',
                    });
                }
            }

            // Find products based on filter
            const products = await productModel.find(filter);

            res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error filtering products',
                error: error.message
            });
        }
    };

}

module.exports = ProductController;