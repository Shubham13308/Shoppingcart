var express= require('express');
var router=express.Router();
var orderController=require('../controller/orderController');
var validateAdminLogin = require('../middleware/validateAdminLogin')

router.post('/order-register',validateAdminLogin,orderController.orderRegisterHandler)

module.exports=router;