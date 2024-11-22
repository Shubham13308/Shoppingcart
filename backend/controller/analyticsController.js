const models = require('../models');
const { Op } = require('sequelize'); 
exports.analyticsCountCustomerHandler = async function (req, res) {
  try {
    const fetchTotalCustomer = await models.Customer_table.findAll();
    const totalCustomer = fetchTotalCustomer.length;

    const fetchTotalProduct = await models.Product.findAll();
    const totalProduct = fetchTotalProduct.length;


    res.status(200).json({
      success: true,
      totalCustomer,
      totalProduct,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching analytics data.",
    });
  }
};




exports.generateChartDataHandler = async function (req, res) {
    try {
      const { start_date, end_date } = req.body;
  
      if (!start_date || !end_date) {
        return res.status(400).json({ success: false, message: "Start date and end date are required" });
      }
  
      const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());
      if (!isValidDate(start_date) || !isValidDate(end_date)) {
        return res.status(400).json({ success: false, message: "Invalid date format" });
      }
  
      const records = await models.Product.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(start_date), new Date(end_date)],
          },
        },
        attributes: ['createdAt', 'product_price'],
        order: [['createdAt', 'ASC']],
      });
  
      if (!records.length) {
        return res.status(404).json({ success: false, message: "No records found for the specified date range" });
      }
  
      const chartData = {};
  
      records.forEach(({ createdAt, product_price }) => {
        
        
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'short' });
  
        if (!chartData[year]) {
          chartData[year] = {};
        }
        chartData[year][month] = (chartData[year][month] || 0) + product_price;
      });
  
      const startYear = new Date(start_date).getFullYear();
      const endYear = new Date(end_date).getFullYear();
      fillMissingMonths(chartData, startYear, endYear);
  
  
      res.status(200).json({
        success: true,
        data: chartData,
      });
    } catch (error) {
      console.error("Error generating chart data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while generating chart data",
      });
    }
  };
  
  const fillMissingMonths = (chartData, startYear, endYear) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let year = startYear; year <= endYear; year++) {
      if (!chartData[year]) chartData[year] = {};
      months.forEach((month) => {
        if (!chartData[year][month]) chartData[year][month] = 0;
      });
    }
  };
  

