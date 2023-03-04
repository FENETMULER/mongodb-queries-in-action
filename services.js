const monogoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.CONN_STR;

mongoose.on("connecting", () => {
  console.log("Establishing a connection to the database...");
});
mongoose.on("connected", () => {
  console.log("Successfully connected to database!");
});
mongoose.on("error", () => {
  console.log("An error has occured!");
});
const mongoConnect = async () => {
  await mongoose.connect(CONN_STR);
};

module.exports = mongoConnect;
