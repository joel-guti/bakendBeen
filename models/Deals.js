const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealschema = Schema({
    name: { type: String, require: true },
    description: { type: String, default: "Este reto no tiene descripcion" },
    image: { type: String, require: true },
    activate: { type: Boolean, default: true },
    award: { type: String, default: "3 puntos + 1 palicula" },
});

module.exports = mongoose.model("Deal", dealschema);