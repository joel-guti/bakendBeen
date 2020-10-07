const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    product: { type: Schema.Types.ObjectId, ref: "Movie" },
    activate: { type: Boolean, default: true },
    thumb: { type: String, require: true },
    pricing: { type: Number, require: true },
});
module.exports = mongoose.model("Store", storeSchema);