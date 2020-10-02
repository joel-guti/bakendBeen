const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, default: "user" },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    points: { type: Number, default: 0 },
    DateUpload: { type: Number, default: Date.now() },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("User", userSchema);