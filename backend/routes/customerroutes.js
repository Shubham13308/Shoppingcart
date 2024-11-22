var express=require("express")
var router=express.Router();
var customerController=require('../controller/customerController');
var validateAdminLogin=require('../middleware/validateAdminLogin')

router.post('/customer-register',validateAdminLogin,customerController.customerRegisterHandler);

router.post('/customer-verify',validateAdminLogin,customerController.customerverifyHandler)



module.exports=router;