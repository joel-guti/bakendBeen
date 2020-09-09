const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, default: "user" },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    points: { type: Number },
});
module.exports = mongoose.model("User", userSchema);