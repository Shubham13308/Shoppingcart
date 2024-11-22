const jwt = require("jsonwebtoken");
const tokenerror = require("../response/admin_response");

const validateAdminLogin = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("token>>>>>>>>>>>>>>>>>>>>>>>>>>>>",token)
  if (!token) {
    return res.status(403).json({
      status: "error",
      message: tokenerror.tokenProviderError(),
    });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    req.admin = decoded; 
    next(); 
  
  })
};

module.exports = validateAdminLogin;
