const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, default: "User" },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    points: { type: Number, default: 0 },
    beeen: { type: Number, default: 0 },
    dealsPending: [{ type: Schema.Types.ObjectId, ref: "Deal" }],
    DateUpload: { type: Number, default: Date.now() },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],

});
module.exports = mongoose.model("User", userSchema);