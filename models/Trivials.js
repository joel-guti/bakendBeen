const mongoose = require("mongoose");
const ramdom = require("mongoose-simple-random");
const Schema = mongoose.Schema;
// MIRAR CON PAPA LO DE LOS ALEATORIOS

const triviaslSchema = Schema({
    question: { type: String, require: true },
    type: { type: String, default: "BackendBeen" },
    ansews: [{ type: String }],
    activate: { type: Boolean, require: true },
    lastPlay: { type: Number, default: Date.now() },
    correct: { type: Number },
});
triviaslSchema.plugin(ramdom);
module.exports = mongoose.model("trivial", triviaslSchema);