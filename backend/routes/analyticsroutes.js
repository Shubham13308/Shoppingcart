var express= require("express");
var router=express.Router();
var analyticsController=require('../controller/analyticsController');
var validateAdminLogin=require('../middleware/validateAdminLogin')

router.get('/analytics-count',analyticsController.analyticsCountCustomerHandler);

router.post('/chart-data',analyticsController.generateChartDataHandler);

module.exports=router;