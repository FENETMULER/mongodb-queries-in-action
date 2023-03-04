const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: Number,
});

module.expoorts = mongoose.model("User", userSchema);
