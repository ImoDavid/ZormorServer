const app = require("./express");
const connectDB = require("./config/db");
require("dotenv").config();

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    connectDB(process.env.MONGO_KEY);
    app.listen(port, console.log(`listening on server ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = start;
