const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  salt: String,
});

module.exports = mongoose.model("User", UserSchema);
