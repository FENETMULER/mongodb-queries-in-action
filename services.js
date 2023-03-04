const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.CONN_STR;

mongoose.connection.on("connecting", () => {
  console.log("Establishing a connection to the database...");
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to database!");
});
mongoose.connection.on("error", () => {
  console.log("An error has occured!");
});
const mongoConnect = async () => {
  await mongoose.connect(connectionString);
};

module.exports = mongoConnect;
