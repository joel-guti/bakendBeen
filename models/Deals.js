const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealschema = Schema({
    name: { type: String, require: true },
    description: { type: String, default: "Este reto no tiene descripcion" },
    image: { type: String, require: true },
    DateCreate: { type: Number, default: Date.now() },
    activate: { type: Boolean, default: true },
    award: { type: String },
    urlHtml: { type: String },
});

module.exports = mongoose.model("Deal", dealschema);