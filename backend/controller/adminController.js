var models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminValidator = require("../response/admin_response");

exports.adminRegisterHandler = function (req, res) {
  const { admin_username, admin_password } = req.body;
  const validationError = adminValidator.adminRegisterValidator(req.body);
  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
    });
  }
  models.Admin.findOne({where:{admin_username}})
  .then((existing_admin)=>{
    if(existing_admin){
      return res.status(409).json({
        status:"error",
        message:"Admin username already exist.Please Choose Different"
      })
    }
    
  })

  const hashedPassword = bcrypt.hashSync(admin_password, 10);

  models.Admin.create({
    admin_username: admin_username,
    admin_password: hashedPassword,
  })
    .then((admin) => {
      res.status(201).json({
        status: "success",
        message: adminValidator.adminRegisterSuccessMessage(),
        data: {
          adminId: admin.id,
          admin_username: admin.admin_username,
          createdAt: admin.createdAt,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: adminValidator.adminErrorMessage(),
        error: err.message,
      });
    });
};

exports.adminLoginHandler = function (req, res) {
  const { admin_username, admin_password } = req.body;
  

  models.Admin.findOne({
    where: { admin_username: admin_username },
  })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          status: "error",
          message: "Invalid username or password",
        });
      }

      const passwordMatch = bcrypt.compareSync(
        admin_password,
        admin.admin_password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          status: "error",
          message: "Invalid username or password",
        });
      }

      try {
        const token = jwt.sign(
          { id: admin.id, admin_username: admin.admin_username }, 
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        
        return res.status(200).json({
          status: "success",
          message: "Login successful",
          data: {
            adminId: admin.id,
            admin_username: admin.admin_username,
            token: token,
          },
        });
      } catch (err) {
        return res.status(500).json({
          status: "error",
          message: "JWT signing failed",
          error: err.message,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Server error occurred",
        error: err.message,
      });
    });
};

exports.adminDashboardHandler = function (req, res) {
  const adminData = req.admin;  
  
  res.status(200).json({
    status: "success",
    message: "Welcome To Dashboard" ,
    data: {
      adminId: adminData.id,  
      admin_username: adminData.admin_username,  
    },
  });
};
exports.adminLogoutHandler = function (req, res) {
  
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

exports.adminFetchAllHandler = async function (req, res) {
  const { activetab } = req.body;

  try {
    let responseData = {
      order: [],
      product: [],
      customer: [],
    };

    if (activetab === 'order') {
      responseData.order = await models.Order.findAll();
    } else if (activetab === 'product') {
      responseData.product = await models.Product.findAll();
    } else if (activetab === 'customer') {
      responseData.customer = await models.Customer_table.findAll();
    } else {
      return res.status(400).json({ message: 'Invalid activetab value' });
    }

    return res.status(200).json({
      status: 'success',
      data: responseData,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message: 'An error occurred while fetching data',
      error: error.message,
    });
  }
};



exports.adminFetchOneHandler = async (req, res) => {
  const { id, admintypes } = req.body;
  

  let responseData = {
    customer: null,
    order: null,
    product: null,
  };

  if (admintypes === 'customer') {
    models.Customer_table.findOne({ where: { customer_id: id } })
      .then((customer) => {
        responseData.customer = customer;
        res.status(200).json({
          success: true,
          data: responseData,
        });
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching customer data.",
          error: error.message,
          
        });
      });
  } else if (admintypes === 'order') {
    try {
      const orderdata = await models.Order.findOne({ where: { order_id: id } })
      // console.log("Fetched Product Data (sent as order):", orderdata.category); 
      const productIds=orderdata.category.split(',');
      // console.log(product_id)
      const fetchProductDetails = await Promise.all(
        productIds.map((productId) =>
          models.Product.findOne({ where: { product_id: productId } })
        )
      );

      responseData.order = orderdata; 
      responseData.productDetails = fetchProductDetails;

      res.status(200).json({
        success: true,
        data: responseData,
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching product data.",
        error: error.message,
      });
    }
  } else if (admintypes === 'product') {
    models.Product.findOne({ where: { product_id: id } })
    
      .then((product) => {
        responseData.product = product;
        res.status(200).json({
          success: true,
          data: responseData,
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching product data.",
          error: error.message,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid admin type provided.",
    });
  }
};


