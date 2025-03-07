const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const HttpStatus = require("http-status-codes");


const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if(!token){
      return res.status(HttpStatus.FORBIDDEN).json({
        message: "No access",
      });
    }

  try {
    const decoded = jwt.verify(token, keys.jwt);
    req.userId = decoded.userId;
    next()
  } catch (error) {
    return res.status(HttpStatus.FORBIDDEN).json({
      message: "Token isn`t valid",
    });
  }
  
}


module.exports = checkAuth