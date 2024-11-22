var models = require("../models");

exports.productRegisterHandler = async function(req, res) {
    const { product_name, product_category, product_description, product_price, product_stock } = req.body;

    try {
        
        const existing_product = await models.Product.findOne({ where: { product_name } });
        if (existing_product) {
            return res.status(409).json({
                status: "error",
                message: "Product already exists"
            });
        }

        
        const generateProductId = async (category) => {
            const prefixes = {
                "Electronics": "El",
                "Food": "FO",
                "Home Appliances": "HO",
                "Books": "BO",
                "Toys": "TO"
            };

            const prefix = prefixes[category];
            if (!prefix) {
                throw new Error("Invalid category");
            }

            
            const latestProduct = await models.Product.findOne({
                where: { product_category: category },
                order: [['createdAt', 'DESC']]
            });

            
            let latestNumber = 100;
            if (latestProduct && latestProduct.product_id.startsWith(prefix)) {
                latestNumber = parseInt(latestProduct.product_id.slice(2), 10) + 1;
            }

            return `${prefix}${latestNumber}`;
        };

        
        const product_id = await generateProductId(product_category);

        
        const product = await models.Product.create({
            product_id: product_id,
            product_name: product_name,
            product_category: product_category,
            product_description: product_description,
            product_price: product_price,
            product_stock: product_stock
        });

        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: {
                product_id: product.product_id,
                product_name: product.product_name,
                product_category: product.product_category,
                product_description: product.product_description,
                product_price: product.product_price,
                product_stock: product.product_stock
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create product",
            error: error.message,
        });
    }
};
exports.productFetchHandler = async function (req, res) {
    try {
        
        const { name } = req.query;  
    
        let searchCriteria = {}; 
    
        if (name) {
            
            searchCriteria.product_name = { [models.Sequelize.Op.like]: `%${name}%` };
        }
    
        
        const products = await models.Product.findAll({
            where: searchCriteria,
        });
    
        
        const categories = await models.Product.findAll({
            attributes: ['product_category'],
            group: ['product_category'],
            order: [['product_category', 'ASC']],
        });
    
        
        const categoryArray = categories.map(category => category.product_category);
    
        if (products.length === 0) {
        
        }
    
        return res.status(200).json({
            status: "success",
            data: { products, categories: categoryArray },
            message: "Products fetched successfully",
        });
    
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

exports.productFetchByCategoryHandler = async function (req, res) {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                status: "error",
                message: "Category is required"
            });
        }

        const products = await models.Product.findAll({
            where: {
                product_category: category
            }
        });

        const categories = await models.Product.findAll({
            attributes: ['product_category'],
            group: ['product_category'],
            order: [['product_category', 'ASC']],
        });

        const categoryArray = categories.map(category => category.product_category);

        if (products.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No products found for the given category"
            });
        }

        return res.status(200).json({
            status: "success",
            data: { products, categories: categoryArray },
            message: "Products fetched by category successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch products by category",
            error: error.message,
        });
    }
};

exports.productStockHandler = async function (req, res) {
    try {
        
        const products = await models.Product.findAll({
            where: {
                product_stock: {
                    [models.Sequelize.Op.lt]: 10  
                }
            }
        });

        
        const totalLowStockProducts = products.length;

        if (products.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No products with low stock found",
                totalLowStockProducts: totalLowStockProducts
            });
        }

        return res.status(200).json({
            status: "success",
            data: products,
            totalLowStockProducts: totalLowStockProducts,  
            message: "Low stock products fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch low stock products",
            error: error.message
        });
    }
};

exports.productreStockHandler = async function (req, res) {
    const { product_id, additional_stock } = req.body;

    if (!product_id || additional_stock === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Product ID and additional stock are required"
        });
    }
    
    try {
        
        const product = await models.Product.findOne({ where: { product_id } });

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        
        const updatedStock = product.product_stock + additional_stock;

        
        await product.update({ product_stock: updatedStock });

        return res.status(200).json({
            status: "success",
            message: "Product stock updated successfully",
            data: {
                product_id: product.product_id,
                product_name: product.product_name,
                updated_stock: updatedStock
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to update product stock",
            error: error.message
        });
    }
};

