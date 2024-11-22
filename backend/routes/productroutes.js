var express=require("express");
var router =express.Router();
var productController=require('../controller/productController');
var validateAdminLogin=require('../middleware/validateAdminLogin')

router.post("/add-product",validateAdminLogin,productController.productRegisterHandler);

router.get("/all-product",productController.productFetchHandler);

router.get('/category-product',validateAdminLogin,productController.productFetchByCategoryHandler);

router.get('/product-stock',productController.productStockHandler);

router.put('/re-stock',validateAdminLogin,productController.productreStockHandler)

module.exports=router;