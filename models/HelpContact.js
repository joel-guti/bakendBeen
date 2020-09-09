const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helperSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, uniqued: true },
  description: {
    type: String,
    default: "Hola contacta conmigo a traves de mi numero de telefono",
  },
  Helper: { type: String, required: true },
});
module.exports = mongoose.model("Helper", helperSchema);
