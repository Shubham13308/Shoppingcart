var models = require("../models");

exports.customerRegisterHandler = async function (req, res) {
  const { customer_name, customer_phn, customer_email, customer_points } = req.body;
  

  
  const existing_customer = await models.Customer_table.findOne({
      where: { customer_name },
  });
  if (existing_customer) {
      return res.status(409).json({
          status: "error",
          message: "Customer name already exists",
      });
  }

  
  const existing_phone = await models.Customer_table.findOne({

      where: { customer_phn },
  });
  if (existing_phone) {
      return res.status(409).json({
          status: "error",
          message: "Phone number already exists",
      });
  }

  
  const existing_email = await models.Customer_table.findOne({
      where: { customer_email },
  });
  if (existing_email) {
      return res.status(409).json({
          status: "error",
          message: "Email already exists",
      });
  }

  
  const lastCustomer = await models.Customer_table.findOne({
      order: [['createdAt', 'DESC']],
  });

  let newCustomerId;
  if (lastCustomer) {
      const lastIdNum = parseInt(lastCustomer.customer_id.replace("Cust", ""), 10);
      newCustomerId = `Cust${lastIdNum + 1}`;
  } else {
      newCustomerId = "Cust101";
  }

  
  const newCustomer = await models.Customer_table.create({
      customer_id: newCustomerId,
      customer_name,
      customer_phn,
      customer_email,
      customer_points,
  });

  return res.json({
      status: "success",
      data: newCustomer,
      message: "Customer created successfully",
  });
};

exports.customerverifyHandler = async function (req, res) {
  
  const { customer_phn } = req.body;
  
  

  
  if (!customer_phn) {
    return res.status(400).json({
      status: "error",
      message: "Phone number is required"
    });
  }

  

  try {
    const customer = await models.Customer_table.findOne({
      where: { customer_phn: customer_phn }
    });

    if (!customer) {
      return res.status(401).json({
        status: "error",
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Customer Verified",
      data: {
        customer_id: customer.customer_id,
        customer_name: customer.customer_name,
        customer_points:customer.customer_points,
        customer_email:customer.customer_email

      }
    });
  } catch (error) {
    console.error("Error finding customer:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while verifying customer"
    });
  }
};
