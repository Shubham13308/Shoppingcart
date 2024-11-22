const { where } = require("sequelize");
const nodemailer = require("nodemailer");
const models = require("../models");

exports.orderRegisterHandler = async function (req, res) {
  try {
    const { customer_id, category, customer_points, price, quantities } = req.body;
    const fetchproductsdetails = category.split(",");
    const quantitydetails = quantities.split(",");

    const lastOrder = await models.Order.findOne({
      order: [["order_id", "DESC"]],
    });

    let nextOrderId;
    if (lastOrder) {
      const lastOrderNumber = parseInt(lastOrder.order_id.slice(2), 10);
      nextOrderId = `OD${lastOrderNumber + 1}`;
    } else {
      nextOrderId = "OD101";
    }

    if (!customer_id) {
      return res.status(400).json({ message: "No Customer Found" });
    }

    const customer = await models.Customer_table.findOne({
      where: { customer_id },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let updatePoints = 0;
    if (customer_points === 0) {
      if (price > 40 && price <= 100) updatePoints = 5;
      else if (price > 100 && price <= 200) updatePoints = 10;
      else if (price > 200 && price <= 500) updatePoints = 15;
      else if (price > 500 && price <= 1000) updatePoints = 40;
      else if (price > 1000 && price <= 2000) updatePoints = 250;
      else if (price > 2000 && price <= 4000) updatePoints = 500;
      else if (price > 4000) updatePoints = 1000;

      const updatedPoints = parseInt(customer.customer_points, 10) + updatePoints;
      await models.Customer_table.update(
        { customer_points: updatedPoints },
        { where: { customer_id } }
      );
    } else if (customer_points > 0) {
      const availedPoints = parseInt(customer.customer_points, 10) - parseInt(customer_points, 10);
      await models.Customer_table.update(
        { customer_points: availedPoints },
        { where: { customer_id } }
      );
    }

    
    let productDetails = [];
    for (let i = 0; i < fetchproductsdetails.length; i++) {
      const productId = fetchproductsdetails[i];
      const quantityToDeduct = parseInt(quantitydetails[i], 10);

      const product = await models.Product.findOne({ where: { product_id: productId } });
      
      if (!product) {
        console.warn(`Product not found: ${productId}`);
        continue;
      }

      const updatedQuantity = product.product_stock - quantityToDeduct;

      if (updatedQuantity < 0) {
        return res.status(400).json({
          message: `Insufficient stock for product ID: ${productId}`,
        });
      }

      await models.Product.update(
        { product_stock: updatedQuantity },
        { where: { product_id: productId } }
      );

      
      productDetails.push({ product_name: product.product_name, quantity: quantityToDeduct });
    }

    
    const newOrder = await models.Order.create({
      order_id: nextOrderId,
      customer_id,
      category,
      price,
    });

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shubham9719260@gmail.com",
        pass: "kwcq zbqy keyw ghso",
      },
    });

    const mailOptions = {
      from: "youremail@example.com",
      to: customer.customer_email,
      subject: "Order Receipt",
      html: `
        <h1>Thank You for Your Purchase!</h1>
        <p>Order ID: ${nextOrderId}</p>
        <p>Customer Name: ${customer.customer_name}</p>
        <p>Total Price: $${price}</p>
        <p>Products:</p>
        <ul>
          ${productDetails
            .map(
              (product) =>
                `<li>Product: ${product.product_name}, Quantity: ${product.quantity}</li>`
            )
            .join("")}
        </ul>
        <p>We appreciate your business!</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Order registered successfully", order: newOrder });
  } catch (error) {
    console.error("Error registering order:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
