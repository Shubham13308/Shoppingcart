var express = require("express");
var router = express.Router();
var adminController = require("../controller/adminController");
var validateAdminLogin=require("../middleware/validateAdminLogin")

router.post("/admin-register", adminController.adminRegisterHandler);
router.post("/admin-login", adminController.adminLoginHandler);
router.get("/admin-dashboard",validateAdminLogin,adminController.adminDashboardHandler); 
router.post("/admin-logout", adminController.adminLogoutHandler);
router.post("/fetch-all",validateAdminLogin,adminController.adminFetchAllHandler);
router.post("/fetch-user",validateAdminLogin,adminController.adminFetchOneHandler);


module.exports = router;
