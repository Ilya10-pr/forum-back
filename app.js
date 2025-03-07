const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { sequelize, dbConnection } = require("./database/connact");
const passport = require("passport");
require("dotenv").config(); 
const app = express();
const PORT = process.env.PORT || 5000;
const multerMiddleware = require("./middleware/multerMiddleware")
const path = require("path");



const jsonBodyMiddleware = express.json();


app.use(express.static(__dirname));
app.use(multerMiddleware.single("file"));
app.use(jsonBodyMiddleware);
app.use(cors());
app.use(routes);
app.use("/images", express.static(path.join(__dirname, "images")));


app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server started on port: ${PORT}`);
  } catch (error) {
    console.log(`Error of connect with database: ${error}`);
  }
})