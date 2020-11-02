const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loamSchema = Schema({
    //  name: { "" }
    user: { type: Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number },
    data: { type: Number, default: Date.now() }

});
module.exports = mongoose.model("Loan", loamSchema);